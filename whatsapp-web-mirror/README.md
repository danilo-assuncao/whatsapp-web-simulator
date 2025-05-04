# WhatsApp Web Mirror

A React application that simulates WhatsApp Web, focusing on real-time messaging, optimistic UI, offline mode, and integration with a Kotlin backend via REST.

## ✨ Features
- WhatsApp Web-inspired interface (sidebar, chat, input, message bubbles)
- Real-time message sending and receiving (polling)
- Offline mode: pending messages are marked and automatically resent when reconnected
- Smart auto-scroll (scrolls only when sending/receiving new messages or on initial load)
- User identification via persistent `user_id`
- Online/offline status with periodic healthcheck
- Responsive, modern UI with TailwindCSS

## 🚀 Technologies
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [uuid](https://www.npmjs.com/package/uuid) (for user_id)
- Expected backend: Kotlin (REST API)

## 📦 Folder Structure
```
├── src/
│   ├── components/         # React components (ChatWindow, Sidebar, MessageBubble, etc)
│   ├── services/           # Backend integration (messageService.js)
│   ├── App.jsx             # Main component
│   └── ...
├── public/                 # Public assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── ...
```

## ⚙️ How to Run the Project
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```
3. The app will be available at `http://localhost:5173` (or the port defined by Vite).

## 🔗 Backend Integration
- The frontend expects a REST backend (Kotlin) running at `http://localhost:8080` with the following endpoints:
  - `GET /messages` → returns a list of messages
  - `POST /messages` → receives `{ user_id, message, timestamp }`
  - `GET /health` → returns 200 if online
- The backend **should not** generate automatic reply messages.
- Messages should be returned in chronological order and with timestamps in UTC (ISO).

## 💡 Possible Future Improvements
- User authentication
- Support for multiple chats/contacts
- WebSocket for real-time messaging
- File/image upload
- Automated tests (Jest + RTL + MSW)
- Internationalization (i18n)

---

Developed with ❤️ for study and demonstration purposes.
