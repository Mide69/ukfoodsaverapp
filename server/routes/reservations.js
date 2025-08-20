const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create reservation
router.post('/', verifyToken, async (req, res) => {
  try {
    const { listingId, quantity } = req.body;
    
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const listingResult = await pool.query('SELECT * FROM food_listings WHERE id = $1', [listingId]);
    if (listingResult.rows.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const listing = listingResult.rows[0];
    const totalAmount = listing.discounted_price * quantity;

    let paymentIntentId = null;
    if (totalAmount > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: 'gbp',
        metadata: { listingId, userId: userResult.rows[0].id }
      });
      paymentIntentId = paymentIntent.id;
    }

    const result = await pool.query(
      `INSERT INTO reservations (listing_id, user_id, quantity, total_amount, payment_intent_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [listingId, userResult.rows[0].id, quantity, totalAmount, paymentIntentId]
    );

    res.status(201).json({
      reservation: result.rows[0],
      clientSecret: paymentIntentId ? (await stripe.paymentIntents.retrieve(paymentIntentId)).client_secret : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's reservations
router.get('/my-reservations', verifyToken, async (req, res) => {
  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [req.user.uid]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await pool.query(`
      SELECT r.*, l.title, l.description, l.pickup_start, l.pickup_end, l.address, u.name as business_name
      FROM reservations r
      JOIN food_listings l ON r.listing_id = l.id
      JOIN users u ON l.business_id = u.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
    `, [userResult.rows[0].id]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;