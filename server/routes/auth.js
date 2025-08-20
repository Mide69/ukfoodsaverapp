const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Register/Login user
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { name, email, userType, phone, address, latitude, longitude } = req.body;
    const firebaseUid = req.user.uid;

    const result = await pool.query(
      `INSERT INTO users (firebase_uid, email, name, user_type, phone, address, latitude, longitude) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       ON CONFLICT (firebase_uid) DO UPDATE SET 
       name = $3, user_type = $4, phone = $5, address = $6, latitude = $7, longitude = $8
       RETURNING *`,
      [firebaseUid, email, name, userType, phone, address, latitude, longitude]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE firebase_uid = $1', [req.user.uid]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;