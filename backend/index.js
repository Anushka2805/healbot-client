require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const chatRoutes = require('./routes/chatRoutes');
const reportRoutes = require('./routes/reportRoutes'); // ✅ now working

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
connectDB();

// ✅ Correct routing
app.use("/api/chat", chatRoutes);      // POST /api/chat , GET /api/chat/summary
app.use("/api/report", reportRoutes);  // POST /api/report/upload-report

app.use("/uploads", express.static("uploads")); // serve uploaded files

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('🎉 Healbot backend is live and running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
