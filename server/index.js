const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const listingsRoutes = require('./routes/listings');
const reservationsRoutes = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/reservations', reservationsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FoodSaver API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});