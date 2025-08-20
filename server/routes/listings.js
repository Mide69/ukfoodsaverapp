const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Get all listings with location filter
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    let query = `
      SELECT l.*, u.name as business_name, u.phone as business_phone 
      FROM food_listings l 
      JOIN users u ON l.business_id = u.id 
      WHERE l.status = 'available' AND l.pickup_end > NOW()
    `;
    let params = [];

    if (lat && lng) {
      query += ` AND (
        6371 * acos(
          cos(radians($1)) * cos(radians(l.latitude)) * 
          cos(radians(l.longitude) - radians($2)) + 
          sin(radians($1)) * sin(radians(l.latitude))
        )
      ) <= $3`;
      params = [lat, lng, radius];
    }

    query += ' ORDER BY l.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new listing
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, quantity, originalPrice, discountedPrice, pickupStart, pickupEnd, latitude, longitude, address } = req.body;
    
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await pool.query(
      `INSERT INTO food_listings (business_id, title, description, quantity, original_price, discounted_price, pickup_start, pickup_end, latitude, longitude, address) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [userResult.rows[0].id, title, description, quantity, originalPrice, discountedPrice, pickupStart, pickupEnd, latitude, longitude, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's listings
router.get('/my-listings', verifyToken, async (req, res) => {
  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await pool.query(
      'SELECT * FROM food_listings WHERE business_id = $1 ORDER BY created_at DESC',
      [userResult.rows[0].id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;