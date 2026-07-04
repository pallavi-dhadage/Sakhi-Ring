# 🛡️ Sakhi Ring – The 200-Meter Human Shield

> *Because in 5 minutes, a presence is worth more than a siren.*

Sakhi Ring is a hyperlocal, real‑time women’s safety network built for the Indian context. Instead of waiting for the police (which takes 5–15 minutes), it instantly connects a woman in distress with verified female volunteers within a **200‑meter radius** – turning bystanders into immediate guardians.

**🚧 Status: Work in progress** – We are actively building the MVP. Contributions are welcome!

---

## 🚨 The Problem We Solve

In crowded Indian cities or isolated streets, an attacker is emboldened by the absence of witnesses. A woman doesn’t need a weapon; she needs human presence. Calling the police is slow, and panic buttons are often snatched away.

---

## 💡 Our Live Solution (Current Features)

- **One‑Tap “Summon Sakhis”** – The user presses a discreet button.
- **Geo‑Hashing Engine** – Finds the 5 nearest registered volunteers within 200m using Redis.
- **Real‑Time Volunteer Tracking** – Volunteers can see the user’s location on a mini‑map (WebSocket live stream).
- **3‑Minute Fallback** – If no volunteer reaches in 3 minutes, the system automatically places a voice call to the nearest PCR van (planned – Twilio integration).
- **Offline‑First** – Works even with patchy 4G; falls back to SMS via Twilio if data is unavailable.

---

## ✨ Key Features (Planned)

- Silent & Discreet activation (optional knock‑knock gesture)
- Volunteer Heatmap – shows density of available Sakhis before you travel
- Real‑time ETA – live countdown of how many Sakhis are coming and their distance
- Privacy First – volunteers see only the rough location during an active emergency
- Govt. API Ready – designed to integrate with Indian Police’s emergency systems

---

## 🧰 Tech Stack (MVP)

| Layer                     | Technology                                         |
|---------------------------|----------------------------------------------------|
| **Frontend (Mobile)**     | React Native / Flutter (planned)                   |
| **Web Dashboard**         | React + Vite + Tailwind + shadcn/ui (in progress) |
| **Backend**               | Node.js + Express + TypeScript                     |
| **Real‑Time**             | WebSockets (Socket.io)                             |
| **Cache & Geo‑Proximity** | Redis (geo‑hashing)                                |
| **Database**              | PostgreSQL + Prisma ORM                            |
| **SMS Fallback**          | Twilio API                                         |
| **Push Notifications**    | Firebase Cloud Messaging (planned)                 |

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Ubuntu/WSL** (or any Linux/macOS)
- **Node.js v18+**, **yarn**
- **PostgreSQL** and **Redis** installed and running

### 1. Clone the repository

```bash
git clone https://github.com/pallavi-dhadage/Sakhi-Ring.git
cd Sakhi-Ring

 Set up the backend
bash
cd backend
yarn install
cp .env.example .env   # or create .env with your own values
Edit .env and set your DATABASE_URL (PostgreSQL) and REDIS_URL.

Create the database (if needed) and run Prisma:

bash
sudo -u postgres psql -c "CREATE USER sakhi_user WITH PASSWORD 'sakhi123';"
sudo -u postgres psql -c "CREATE DATABASE sakhi_db OWNER sakhi_user;"
npx prisma db push   # syncs schema without migrations
npx prisma generate
Start the backend:

bash
yarn dev
Backend runs at http://localhost:5000.

3. Set up the frontend (in progress)
Note: The React dashboard is still being built. You can start it separately:

bash
cd ../frontend
yarn install
yarn dev
Frontend runs at http://localhost:5173.

🧪 Testing the Flow
Open the frontend in two browser windows (or tabs).

In one, toggle “Become a Sakhi” – this registers you as a volunteer.

In the other, click “Summon Sakhis” – the backend will find volunteers within 200m and send real‑time alerts via WebSockets.

🛠️ Project Structure (Current)
text
sakhi-ring/
├── backend/
│   ├── src/
│   │   └── index.ts        # Express server + Socket.io + Redis
│   ├── prisma/
│   │   └── schema.prisma   # Database models
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/               # React + Tailwind dashboard (in progress)
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
🤝 How to Contribute
We welcome all contributors – developers, designers, testers, and advocates!

Fork the repository.

Create a branch for your feature/fix: git checkout -b feature/amazing-feature

Commit your changes: git commit -m "Add some amazing feature"

Push to your fork: git push origin feature/amazing-feature

Open a Pull Request describing your changes.

Areas we need help with:

Frontend dashboard polish and mobile responsiveness

Real‑time map integration (Leaflet/Mapbox)

Twilio fallback voice/SMS

Authentication (Google/Phone OTP)

Testing and documentation

Please read our Code of Conduct (to be added) and follow standard Git best practices.

📄 License
This project is open‑source and available under the MIT License.

🙏 Acknowledgements
Built with ❤️ for women’s safety in India. Inspired by the need for immediate human presence in crisis situations.

✨ Let’s make our cities safer, one Sakhi at a time.


