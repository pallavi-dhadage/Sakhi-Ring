# 🛡️ Sakhi Ring – The 200‑Meter Human Shield

> *"In the 5 minutes it takes for help to arrive, a nearby presence is worth more than a distant siren."*

Sakhi Ring is a hyperlocal, real‑time safety network designed for the Indian context, where response times can mean the difference between fear and safety. Instead of relying solely on police (5–15 minutes away), it instantly connects a woman in distress with **verified female volunteers within a 200‑meter radius** – transforming everyday bystanders into immediate guardians.

---

## 🚨 The Reality We Address

In crowded Indian cities or isolated streets, an attacker is emboldened by the absence of witnesses. A woman doesn’t need a weapon – she needs **human presence**. Calling the police is slow, and panic buttons are often snatched away before they can be used. Sakhi Ring bridges that critical gap.

---

## 💡 How It Works (Live Today)

- **One‑Tap "Summon Sakhis"** – A discreet button triggers an instant alert.
- **Geo‑Hashing** – Identifies the 5 nearest registered volunteers within 200 m in real time.
- **Live Volunteer Tracking** – Volunteers appear on a mini‑map (WebSocket streaming).
- **3‑Minute Fallback** – If no volunteer arrives in 3 minutes, an automatic voice call is placed to the nearest PCR van with GPS details (*planned*).
- **Offline‑First** – Falls back to SMS via Twilio if data is patchy (*planned*).

---

## ✨ Key Features

| Feature | Status |
|---------|--------|
| ✅ Discreet "Summon Sakhis" button | Done |
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
