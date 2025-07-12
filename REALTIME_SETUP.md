# Real-Time Q&A Setup Guide

This guide explains how to set up and run the real-time question and answering feature for the StackIT platform.

## Features Implemented

✅ **Real-time Question Publishing**
- Live question publishing with WebSocket communication
- Instant notifications to all connected users
- Connection status indicators

✅ **Real-time Answer Posting**
- Live answer posting with immediate updates
- Question room management for targeted updates
- Real-time notifications for new answers

✅ **Real-time Voting**
- Live vote updates for questions and answers
- Instant vote count synchronization across all clients
- Disabled voting when offline

✅ **Connection Management**
- WebSocket connection status monitoring
- Automatic reconnection handling
- Offline/online status indicators

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Setup Instructions

### 1. Install Frontend Dependencies

```bash
cd STACKIT_NEURALNEXUS
npm install
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Start the WebSocket Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001` with the following endpoints:
- WebSocket: `ws://localhost:3001`
- Health check: `http://localhost:3001/health`
- API: `http://localhost:3001/api/*`

### 4. Start the Frontend Development Server

In a new terminal:

```bash
cd STACKIT_NEURALNEXUS
npm run dev
```

The frontend will start on `http://localhost:5173`

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_WEBSOCKET_URL=http://localhost:3001
```

## How It Works

### Real-time Question Publishing

1. **User submits a question** in the Ask Question page
2. **WebSocket emits** `publish_question` event with question data
3. **Server processes** the question and assigns an ID
4. **Server broadcasts** `new_question` event to all connected clients
5. **All clients receive** the new question and update their UI

### Real-time Answer Posting

1. **User submits an answer** in the Question Detail page
2. **WebSocket emits** `post_answer` event with answer data
3. **Server processes** the answer and assigns an ID
4. **Server broadcasts** `new_answer` event to question room and all clients
5. **Connected clients receive** the new answer and update their UI

### Real-time Voting

1. **User votes** on a question or answer
2. **WebSocket emits** `vote_question` or `vote_answer` event
3. **Server updates** the vote count in memory
4. **Server broadcasts** `vote_updated` event to all clients
5. **All clients receive** the vote update and sync their UI

## Testing the Real-time Features

### Test Question Publishing

1. Open the app in multiple browser tabs
2. Navigate to "Ask Question" in one tab
3. Fill out and submit a question
4. Watch the question appear instantly in other tabs

### Test Answer Posting

1. Open a question detail page in multiple tabs
2. Post an answer in one tab
3. Watch the answer appear instantly in other tabs

### Test Voting

1. Open a question detail page in multiple tabs
2. Vote on the question or answers in one tab
3. Watch the vote counts update instantly in other tabs

## Connection Status

The app shows real-time connection status:
- 🟢 **Live**: Connected to WebSocket server
- 🔴 **Offline**: Disconnected from WebSocket server

## Troubleshooting

### Connection Issues

1. **Check server is running**: Ensure the WebSocket server is started on port 3001
2. **Check CORS**: The server is configured to accept connections from `http://localhost:5173`
3. **Check environment variables**: Ensure `VITE_WEBSOCKET_URL` is set correctly

### Real-time Not Working

1. **Check browser console** for WebSocket connection errors
2. **Verify server logs** for connection events
3. **Check network tab** for WebSocket connection status

### Performance Issues

1. **Limit concurrent connections** in production
2. **Implement rate limiting** for voting and posting
3. **Add database persistence** for production use

## Production Considerations

For production deployment:

1. **Database Integration**: Replace in-memory storage with a real database
2. **Authentication**: Add user authentication to WebSocket connections
3. **Rate Limiting**: Implement rate limiting for all real-time events
4. **Scaling**: Consider using Redis for WebSocket scaling
5. **Security**: Add input validation and sanitization
6. **Monitoring**: Add logging and monitoring for WebSocket connections

## API Reference

### WebSocket Events

#### Client to Server
- `publish_question`: Publish a new question
- `post_answer`: Post a new answer
- `vote_question`: Vote on a question
- `vote_answer`: Vote on an answer
- `join_question_room`: Join a question's real-time room
- `leave_question_room`: Leave a question's real-time room

#### Server to Client
- `new_question`: New question published
- `new_answer`: New answer posted
- `vote_updated`: Vote count updated
- `question_updated`: Question data updated
- `answer_updated`: Answer data updated

### REST API Endpoints

- `GET /api/questions`: Get all questions
- `GET /api/questions/:id`: Get specific question with answers
- `GET /api/answers/:questionId`: Get answers for a question
- `GET /health`: Server health check

## Architecture

```
Frontend (React) ←→ WebSocket ←→ Server (Node.js + Socket.io)
     ↓                    ↓                    ↓
  Real-time UI    Real-time Events    In-memory Storage
```

The real-time functionality uses a WebSocket connection for instant bidirectional communication between the frontend and backend, enabling live updates for questions, answers, and voting across all connected clients. 