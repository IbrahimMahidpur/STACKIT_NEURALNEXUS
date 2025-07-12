# 🚀 How to Run Your Real-Time Q&A Platform

## **IMPORTANT: Run these commands from the CORRECT directories!**

---

## **Step 1: Start the Backend Server**

**Open a new terminal/PowerShell window and run these commands:**

```powershell
cd C:\Users\imahi\stackit1\STACKIT_NEURALNEXUS\server
node server.js
```

**✅ You should see:**
```
🚀 Real-time server running on port 3001
📡 WebSocket server ready for connections
🌐 Health check: http://localhost:3001/health
👥 Active users: 0
```

---

## **Step 2: Start the Frontend**

**Open another terminal/PowerShell window and run these commands:**

```powershell
cd C:\Users\imahi\stackit1\STACKIT_NEURALNEXUS
npm run dev
```

**✅ You should see:**
```
  VITE v5.x.x  ready in ... ms
  ➜  Local:   http://localhost:5173/
```

---

## **Step 3: Access Your Platform**

Open your browser and go to: **http://localhost:5173**

---

## **❌ Common Mistakes to Avoid**

### **Don't run from the wrong directory:**
```powershell
# ❌ WRONG - Don't run from here:
C:\Users\imahi\stackit1> npm run dev
C:\Users\imahi\stackit1> node server.js

# ✅ CORRECT - Run from these directories:
C:\Users\imahi\stackit1\STACKIT_NEURALNEXUS\server> node server.js
C:\Users\imahi\stackit1\STACKIT_NEURALNEXUS> npm run dev
```

---

## **✅ Success Indicators**

When everything is working correctly, you should see:

1. **Backend terminal shows:** "Real-time server running on port 3001"
2. **Frontend terminal shows:** "Local: http://localhost:5173/"
3. **Browser shows:** "Live" indicator in the top-right corner
4. **Real-time updates work:** Questions and answers appear instantly

---

## **🔧 If You Still Have Issues**

1. **Make sure you're in the correct directories** (see above)
2. **Check that both terminals are running** (don't close them)
3. **Make sure you have a `.env` file** in `STACKIT_NEURALNEXUS` with:
   ```
   VITE_WEBSOCKET_URL=http://localhost:3001
   ```

---

**🎉 That's it! Your real-time Q&A platform should now work perfectly!** 