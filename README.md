# 🛡️ Sakhi Ring – The 200‑Meter Human Shield

> *“Because in 5 minutes, a presence is worth more than a siren.”*

Sakhi Ring is a hyperlocal, real‑time women’s safety network built for the Indian context.  
Instead of waiting for the police (5–15 minutes), it instantly connects a woman in distress with **verified female volunteers within a 200‑meter radius** – turning bystanders into immediate guardians.

---

## 🚨 The Problem We Solve

In crowded Indian cities or isolated streets, an attacker is emboldened by the absence of witnesses. A woman doesn’t need a weapon – she needs **human presence**.  
Calling the police is slow, and panic buttons are often snatched away.

---

## 💡 Our Live Solution

- **One‑Tap “Summon Sakhis”** – a discreet button triggers an alert.
- **Geo‑Hashing** – finds the 5 nearest registered volunteers within 200 m in real time.
- **Live Volunteer Tracking** – volunteers appear on a mini‑map (WebSocket streaming).
- **3‑Minute Fallback** – if no volunteer reaches in 3 minutes, an automatic voice call is placed to the nearest PCR van with GPS details (planned).
- **Offline‑First** – falls back to SMS via Twilio if data is patchy (planned).

---

## ✨ Key Features (Currently Working)

| Feature | Status |
|---------|--------|
| ✅ Discreet “Summon Sakhis” button | Done |
| ✅ Geolocation (browser API) | Done |
| ✅ Redis geo‑hashing for 200m radius | Done |
| ✅ Real‑time WebSocket alerts (Socket.io) | Done |
| ✅ Volunteer registration & location sharing | Done |
| ✅ Incoming alert list with distance | Done |
| ✅ Accept alert (volunteer) | Done |
| ✅ Responsive web dashboard (Tailwind + Leaflet) | Done |
| ❌ 3‑minute fallback (Twilio Voice) | Planned |
| ❌ Push notifications (FCM) | Planned |
| ❌ SMS fallback (Twilio) | Planned |
| ❌ Authentication (JWT/OTP) | Planned |
| ❌ Mobile App (React Native / Flutter) | Planned |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js + Express + TypeScript |
| **Real‑time** | Socket.io |
| **Geo‑Proximity** | Redis (Geo‑hashing) |
| **Database** | PostgreSQL + Prisma ORM |
| **Frontend** | React + Vite + TypeScript |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| **Maps** | Leaflet + React‑Leaflet |
| **Fallback** | Twilio (SMS/Voice) – *planned* |

---

## 🚀 Quick Setup (Development)

### Prerequisites
- Node.js (v18+)
- Yarn or npm
- PostgreSQL
- Redis

### 1. Clone the repository
```bash
git clone https://github.com/pallavi-dhadage/Sakhi-Ring.git
cd Sakhi-Ring
2. Backend
bash
cd backend
cp .env.example .env   # or create .env with your DATABASE_URL
yarn install
npx prisma db push     # sync database schema
yarn dev
Backend runs at http://localhost:5000

3. Frontend
bash
cd ../frontend
yarn install
yarn dev
Frontend runs at http://localhost:5173

4. Open two browser tabs
Tab 1: User – click “Summon Sakhis”

Tab 2 (or incognito): Volunteer – toggle “Become a Sakhi” and accept incoming alerts

📸 Screenshots
(Add screenshots here later)

📌 Current Status (as of July 2026)
✅ Backend: REST APIs, WebSocket server, Redis geo‑queries, Prisma + PostgreSQL.

✅ Frontend: Responsive dashboard with map, emergency button, volunteer mode, real‑time alerts.

✅ Integration: Full end‑to‑end flow from summon to acceptance.

✅ Deployment: Ready for local development; Docker‑ization is next.

🤝 Contribute
We welcome contributions! Please open an issue or pull request for any bug fixes, features, or improvements.

📄 License
This project is open‑source under the MIT License.

💬 Contact
For questions or collaboration, please reach out via GitHub Issues.

Together, we can make our cities safer. 
