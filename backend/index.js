require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const chatRoutes = require('./routes/chatRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// ✅ Updated CORS config to support all known frontend URLs
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://healbot-client.vercel.app',
    'https://healbot-client-rouge.vercel.app',
    'https://healbot-client-m5xihpdt0-anushka-aggarwals-projects.vercel.app'  // Add all current Vercel preview URLs here
  ],
  credentials: true,
  methods: ['GET', 'POST']
}));

app.use(express.json());
connectDB();

// ✅ Correct routing
app.use("/api/chat", chatRoutes);      // POST /api/chat , GET /api/chat/summary
app.use("/api/report", reportRoutes);  // POST /api/report/upload-report

// ✅ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('🎉 Healbot backend is live and running!');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
