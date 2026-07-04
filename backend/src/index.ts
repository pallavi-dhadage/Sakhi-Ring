import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: '*' } });

// ✅ PrismaClient reads DATABASE_URL from .env automatically
const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL!);

app.use(cors());
app.use(express.json());

app.post('/api/volunteer/location', async (req, res) => {
  const { userId, lat, lng } = req.body;
  if (!userId || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { latitude: lat, longitude: lng, lastActive: new Date() },
  });
  await redis.geoadd('volunteers', lng, lat, userId);
  res.json({ success: true });
});

app.post('/api/summon', async (req, res) => {
  const { userId, lat, lng } = req.body;
  const alert = await prisma.alert.create({
    data: { userId, latitude: lat, longitude: lng, status: 'active' },
  });

  const radius = 200;
  const nearby = await redis.georadius(
    'volunteers',
    lng,
    lat,
    radius,
    'm',
    'WITHDIST',
    'ASC',
    'COUNT',
    5
  );
  const volunteerIds = nearby.map((item: any) => item[0]);

  volunteerIds.forEach((vid: string) => {
    io.to(`volunteer_${vid}`).emit('new_alert', {
      alertId: alert.id,
      userLat: lat,
      userLng: lng,
      distance: nearby.find((n: any) => n[0] === vid)[1],
    });
  });

  res.json({ alertId: alert.id, volunteersNotified: volunteerIds.length });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('register_volunteer', (userId) => {
    socket.join(`volunteer_${userId}`);
    console.log(`Volunteer ${userId} registered`);
  });
  socket.on('accept_alert', async ({ alertId, volunteerId }) => {
    const alert = await prisma.alert.findUnique({ where: { id: alertId } });
    if (!alert) return;
    await prisma.alert.update({
      where: { id: alertId },
      data: { volunteerId, status: 'resolved', resolvedAt: new Date() },
    });
    io.emit(`user_${alert.userId}`, { type: 'volunteer_accepted', volunteerId });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
