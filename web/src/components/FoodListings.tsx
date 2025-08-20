import React, { useState, useEffect } from 'react';
import { FoodListing } from '../types';
import { listingsAPI, reservationsAPI } from '../services/api';

const FoodListings: React.FC = () => {
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await listingsAPI.getAll();
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (listingId: number, quantity: number = 1) => {
    try {
      const response = await reservationsAPI.create({ listingId, quantity });
      alert('Reservation created successfully!');
      fetchListings(); // Refresh listings
    } catch (error: any) {
      alert('Error creating reservation: ' + error.response?.data?.error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Food Listings</h2>
      
      {listings.length === 0 ? (
        <p>No food listings available at the moment.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {listings.map((listing) => (
            <div key={listing.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <p><strong>Business:</strong> {listing.business_name}</p>
              <p><strong>Quantity:</strong> {listing.quantity}</p>
              {listing.original_price && (
                <p>
                  <strong>Price:</strong> 
                  <span style={{ textDecoration: 'line-through', marginLeft: '5px' }}>
                    £{listing.original_price}
                  </span>
                  {listing.discounted_price && (
                    <span style={{ color: 'green', marginLeft: '5px' }}>
                      £{listing.discounted_price}
                    </span>
                  )}
                </p>
              )}
              <p><strong>Pickup:</strong> {new Date(listing.pickup_start).toLocaleString()} - {new Date(listing.pickup_end).toLocaleString()}</p>
              <p><strong>Address:</strong> {listing.address}</p>
              
              <button
                onClick={() => handleReserve(listing.id)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reserve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodListings;