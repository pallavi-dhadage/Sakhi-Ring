# 🛡️ Sakhi Ring – The 200-Meter Human Shield

> *"Because in 5 minutes, a presence is worth more than a siren."*

Sakhi Ring is a hyperlocal, real‑time women’s safety network built for the Indian context. Instead of waiting for the police (5–15 minutes), it instantly connects a woman in distress with verified female volunteers within a **200‑meter radius** – turning bystanders into immediate guardians.

## 🚨 The Problem
In crowded Indian cities or isolated streets, an attacker is emboldened by the absence of witnesses. A woman doesn’t need a weapon – she needs **human presence**. Calling the police is slow, and panic buttons are often snatched away.

## 💡 Our Solution
- **One‑Tap "Summon Sakhis"** – discreet button triggers an alert.
- **Geo‑Hashing** – finds the 5 nearest registered volunteers within 200 m.
- **Live Tracking** – volunteers appear on a mini‑map (WebSocket).
- **3‑Minute Fallback** – if no volunteer reaches, automatic voice call to the nearest PCR van with GPS details.
- **Offline‑First** – falls back to SMS via Twilio if data is patchy.

## ✨ Key Features
- Silent & discreet – optional knock‑knock gesture trigger.
- Volunteer heatmap – see available Sakhis before traveling.
- Real‑time ETA – countdown of Sakhis coming and their distance.
- Privacy first – volunteers see only rough location during active emergencies.
- Govt. API ready – built to integrate with Indian Police systems.

## 🧱 Tech Stack
- **Backend**: Node.js + Express + TypeScript
- **Realtime**: Socket.io
- **Geo‑Proximity**: Redis (Geo‑hashing)
- **Database**: PostgreSQL + Prisma (ORM)
- **Frontend**: React + Vite + Tailwind + shadcn/ui
- **Maps**: Leaflet
- **Fallback**: Twilio (SMS/Voice)

## 🚀 Quick Setup (Dev)
```bash
# Clone the repo
git clone https://github.com/pallavi-dhadage/Sakhi-Ring.git
cd Sakhi-Ring

# Backend
cd backend
cp .env.example .env   # edit with your credentials
yarn install
yarn dev
📌 Current Status
Work in progress – core backend is  functional. Next steps:

Authentication (JWT / OAuth)

3‑minute fallback timer with Twilio voice

Push notifications (FCM)

Docker deployment

🤝 Contribute
Feel free to open issues or pull requests. Let’s make our cities safer together.
