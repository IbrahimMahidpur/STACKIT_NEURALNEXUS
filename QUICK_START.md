# 🚀 Quick Start Guide - Real-Time Q&A Platform

## **Step-by-Step Setup**

### **Step 1: Start the Real-Time Backend Server**

**Open a new terminal/PowerShell window and run:**

```powershell
cd C:\Users\imahi\stackit1\STACKIT_NEURALNEXUS\server
node server.js
```

**You should see:**
```
🚀 Real-time server running on port 3001
📡 WebSocket server ready for connections
🌐 Health check: http://localhost:3001/health
👥 Active users: 0
```

### **Step 2: Start the Frontend**

**Open another terminal/PowerShell window and run:**

```powershell
cd C:\Users\imahi\stackit1\STACKIT_NEURALNEXUS
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in ... ms
  ➜  Local:   http://localhost:5173/
```

### **Step 3: Access Your Real-Time Q&A Platform**

Open your browser and go to: **http://localhost:5173**

---

## **✅ Real-Time Features You'll See**

### **Live Connection Status**
- 🟢 **"Live" indicator** when connected
- 🔴 **"Offline" indicator** when disconnected
- **Active user count** showing how many people are online

### **Real-Time Question Publishing**
- When you publish a question, it appears **instantly** on all connected browsers
- **Green border** around new questions
- **Toast notifications** when questions are published

### **Real-Time Answer Posting**
- When you post an answer, it appears **immediately** on all connected browsers
- **Live notifications** for new answers
- **Real-time vote updates**

### **Real-Time Voting**
- Vote counts update **instantly** across all browsers
- **Live synchronization** of all votes

---

## **🧪 Test Real-Time Features**

### **Test 1: Question Publishing**
1. Open **two browser tabs** with your site
2. In one tab, go to **"Ask Question"**
3. Fill out and submit a question
4. **Watch it appear instantly** in the other tab

### **Test 2: Answer Posting**
1. Open a question detail page in **two tabs**
2. Post an answer in one tab
3. **Watch it appear instantly** in the other tab

### **Test 3: Voting**
1. Open a question detail page in **two tabs**
2. Vote on the question or answers in one tab
3. **Watch vote counts update instantly** in the other tab

---

## **🔧 Troubleshooting**

### **If you see "failed to connect real time":**
1. **Check that the backend is running** (Step 1)
2. **Check that the frontend is running** (Step 2)
3. **Make sure you have a `.env` file** in `STACKIT_NEURALNEXUS` with:
   ```
   VITE_WEBSOCKET_URL=http://localhost:3001
   ```

### **If you see "Could not read package.json":**
- You're in the wrong directory
- **Backend must run from:** `STACKIT_NEURALNEXUS\server`
- **Frontend must run from:** `STACKIT_NEURALNEXUS`

### **If nothing updates in real-time:**
1. Check browser console (F12) for errors
2. Make sure both servers are running
3. Check that you see the "Live" indicator

---

## **📱 What You'll See**

### **Homepage Features:**
- ✅ **Real-time connection status**
- ✅ **Live active user count**
- ✅ **New questions appear instantly**
- ✅ **Real-time notifications**

### **Question Detail Features:**
- ✅ **Live answer updates**
- ✅ **Real-time voting**
- ✅ **Connection status indicators**
- ✅ **Instant feedback**

### **Ask Question Features:**
- ✅ **Real-time publishing**
- ✅ **Connection status**
- ✅ **Success notifications**

---

## **🎯 Success Indicators**

When everything is working correctly, you should see:

1. **"Live" indicator** in the top-right corner
2. **Active user count** showing online users
3. **Real-time updates** when you publish questions/answers
4. **Instant vote count changes**
5. **Toast notifications** for new content

---

**🎉 Congratulations! Your real-time Q&A platform is now live!**

If you encounter any issues, check the troubleshooting section above or restart both servers. 