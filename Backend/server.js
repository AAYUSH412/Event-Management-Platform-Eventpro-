import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import ticketTypeRoutes from './routes/ticketTypeRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4000',
    'https://eventpro-frontend.vercel.app',
    'https://eventpro-backend.vercel.app'
  ],
  credentials: true
}));


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message 
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/tickettypes', ticketTypeRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>API Status</title>
        </head>
        <body>
          <h1>API is working</h1>
          <p>Welcome to the API. Everything is running smoothly.</p>
        </body>
      </html>
    `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});