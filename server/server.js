import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
// In a real app, this would be a database
let questions = [];
let answers = [];
let questionIdCounter = 1;
let answerIdCounter = 1;
let activeUsers = new Set();
let processedAnswers = new Set(); // Track processed answers to prevent duplicates

// Socket connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  activeUsers.add(socket.id);
  
  // Broadcast active user count to all clients
  io.emit('active_users_update', activeUsers.size);

  // Handle question publishing
  socket.on('publish_question', (questionData) => {
    const newQuestion = {
      id: questionIdCounter++,
      ...questionData,
      votes: 0,
      views: 0,
      timeAgo: 'Just now',
      createdAt: new Date().toISOString()
    };

    questions.unshift(newQuestion);
    
    // Broadcast to all connected clients
    io.emit('new_question', newQuestion);
    
    // Send notification to all clients
    io.emit('notification', {
      type: 'question',
      title: newQuestion.title,
      author: newQuestion.author.name,
      questionId: newQuestion.id,
      timestamp: new Date()
    });
    
    console.log('Question published:', newQuestion.title);
  });

  // Handle answer posting
  socket.on('post_answer', ({ questionId, answer }) => {
    // Create a unique identifier for this answer to prevent duplicates
    const answerKey = `${questionId}-${answer.author.name}-${Date.now()}`;
    
    // Check if this answer has already been processed
    if (processedAnswers.has(answerKey)) {
      console.log('Duplicate answer detected, skipping:', answerKey);
      return;
    }
    
    // Mark this answer as processed
    processedAnswers.add(answerKey);
    
    // Clean up old processed answers after 5 minutes to prevent memory leaks
    setTimeout(() => {
      processedAnswers.delete(answerKey);
    }, 5 * 60 * 1000);

    const newAnswer = {
      id: answerIdCounter++,
      questionId, // Add questionId to track which question this answer belongs to
      ...answer,
      votes: 0,
      timeAgo: 'Just now',
      accepted: false,
      comments: [],
      uniqueId: answerKey // Add unique identifier
    };

    answers.push(newAnswer);
    
    // Broadcast to all clients in the question room (only once)
    io.to(`question_${questionId}`).emit('new_answer', {
      questionId,
      answer: newAnswer
    });
    
    // Also broadcast to all clients for notifications (only once)
    io.emit('new_answer', {
      questionId,
      answer: newAnswer
    });

    // Send notification to all clients (only once)
    io.emit('notification', {
      type: 'answer',
      title: `New answer for question #${questionId}`,
      author: newAnswer.author.name,
      questionId: questionId,
      timestamp: new Date()
    });
    
    console.log('Answer posted for question:', questionId, 'Unique ID:', answerKey);
  });

  // Handle question voting
  socket.on('vote_question', ({ questionId, voteType }) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const voteChange = voteType === 'up' ? 1 : -1;
      question.votes += voteChange;
      
      // Broadcast vote update
      io.emit('vote_updated', {
        type: 'question',
        id: questionId,
        votes: question.votes
      });
      
      console.log(`Question ${questionId} voted ${voteType}, new total: ${question.votes}`);
    }
  });

  // Handle answer voting
  socket.on('vote_answer', ({ answerId, voteType }) => {
    const answer = answers.find(a => a.id === answerId);
    if (answer) {
      const voteChange = voteType === 'up' ? 1 : -1;
      answer.votes += voteChange;
      
      // Broadcast vote update
      io.emit('vote_updated', {
        type: 'answer',
        id: answerId,
        votes: answer.votes
      });
      
      console.log(`Answer ${answerId} voted ${voteType}, new total: ${answer.votes}`);
    }
  });

  // Handle joining question rooms
  socket.on('join_question_room', ({ questionId }) => {
    socket.join(`question_${questionId}`);
    console.log(`User ${socket.id} joined question room: ${questionId}`);
  });

  // Handle leaving question rooms
  socket.on('leave_question_room', ({ questionId }) => {
    socket.leave(`question_${questionId}`);
    console.log(`User ${socket.id} left question room: ${questionId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    activeUsers.delete(socket.id);
    
    // Broadcast updated active user count
    io.emit('active_users_update', activeUsers.size);
  });
});

// REST API endpoints for initial data loading
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.get('/api/questions/:id', (req, res) => {
  const question = questions.find(q => q.id === parseInt(req.params.id));
  if (question) {
    const questionAnswers = answers.filter(a => a.questionId === question.id);
    res.json({ question, answers: questionAnswers });
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

app.get('/api/answers/:questionId', (req, res) => {
  const questionAnswers = answers.filter(a => a.questionId === parseInt(req.params.questionId));
  res.json(questionAnswers);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    connections: io.engine.clientsCount,
    activeUsers: activeUsers.size,
    questions: questions.length,
    answers: answers.length,
    processedAnswers: processedAnswers.size
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Real-time server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Active users: ${activeUsers.size}`);
}); 