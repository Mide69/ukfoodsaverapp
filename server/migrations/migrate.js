const pool = require('../config/database');

const createTables = async () => {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firebase_uid VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        user_type VARCHAR(50) DEFAULT 'consumer',
        phone VARCHAR(20),
        address TEXT,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Food listings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS food_listings (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        quantity INTEGER NOT NULL,
        original_price DECIMAL(10, 2),
        discounted_price DECIMAL(10, 2),
        pickup_start TIMESTAMP NOT NULL,
        pickup_end TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'available',
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Reservations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        listing_id INTEGER REFERENCES food_listings(id),
        user_id INTEGER REFERENCES users(id),
        quantity INTEGER NOT NULL,
        total_amount DECIMAL(10, 2),
        status VARCHAR(50) DEFAULT 'pending',
        payment_intent_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    pool.end();
  }
};

createTables();