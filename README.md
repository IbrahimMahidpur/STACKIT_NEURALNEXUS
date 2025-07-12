# Welcome to your Lovable project

## Project info

# 🧠 StackIt – Minimal Q&A Platform for Collaborative Learning

**StackIt** is a sleek, minimalistic question-and-answer platform built to support structured knowledge sharing within communities. It's designed for speed, simplicity, and an exceptional user experience — perfect for students, developers, and domain-specific knowledge hubs.


## 🚀 Features

### 👤 User Roles
- **Guest** – View questions & answers
- **User** – Register, log in, post questions & answers, vote
- **Admin** – Moderate content

### 🔧 Core Functionality
- **Ask Questions** with:
  - 📌 Title
  - 📝 Rich-text description (Markdown-style editor with emoji, links, images, lists, text alignment)
  - 🏷️ Tags (multi-select input)
- **Answer Questions** with full formatting support
- **Voting System** (upvote/downvote)
- **Accept Answers** by question author
- **Mention Support** (`@username`) for notifications
- **Notification Bell** 🔔 for real-time alerts
- **Tag Filtering** to browse specific domains
- **Accessibility Compliant** (WCAG standards)

### ⚡ Real-time Features (NEW!)
- **Live Question Publishing** - Questions appear instantly across all connected users
- **Real-time Answer Posting** - Answers are broadcasted immediately to all viewers
- **Live Voting** - Vote counts update in real-time across all clients
- **Connection Status** - Visual indicators for online/offline status
- **WebSocket Communication** - Instant bidirectional updates

### ✨ Tech Highlights
This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Socket.io (Real-time communication)
- Express.js (WebSocket server)


## 📸 Demo Video





## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/stackit.git
cd stackit
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install server dependencies (for real-time features)
cd server
npm install
cd ..
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory:
```env
VITE_WEBSOCKET_URL=http://localhost:3001
```

### 4. Start the Development Servers

**Terminal 1 - Start WebSocket Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:5173
- WebSocket Server: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🔥 Real-time Features Setup

For detailed instructions on the real-time functionality, see [REALTIME_SETUP.md](./REALTIME_SETUP.md).

### Quick Test
1. Open the app in multiple browser tabs
2. Navigate to "Ask Question" in one tab
3. Submit a question and watch it appear instantly in other tabs
4. Post answers and vote to see real-time updates

## 📚 Documentation

- [Real-time Setup Guide](./REALTIME_SETUP.md) - Complete guide for real-time features
- [Environment Variables](./env.example) - Configuration options

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
