import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ListingsScreen: React.FC = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`${API_URL}/listings`);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      Alert.alert('Error', 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (listingId: number) => {
    Alert.alert(
      'Reserve Food',
      'Are you sure you want to reserve this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reserve', onPress: () => createReservation(listingId) }
      ]
    );
  };

  const createReservation = async (listingId: number) => {
    try {
      await axios.post(`${API_URL}/reservations`, { listingId, quantity: 1 });
      Alert.alert('Success', 'Reservation created successfully!');
      fetchListings();
    } catch (error) {
      Alert.alert('Error', 'Failed to create reservation');
    }
  };

  const renderListing = ({ item }: { item: any }) => (
    <View style={styles.listingCard}>
      <Text style={styles.listingTitle}>{item.title}</Text>
      <Text style={styles.listingDescription}>{item.description}</Text>
      <Text style={styles.listingBusiness}>Business: {item.business_name}</Text>
      <Text style={styles.listingQuantity}>Quantity: {item.quantity}</Text>
      {item.discounted_price && (
        <Text style={styles.listingPrice}>Price: £{item.discounted_price}</Text>
      )}
      <Text style={styles.listingAddress}>{item.address}</Text>
      
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => handleReserve(item.id)}
      >
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        renderItem={renderListing}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No food listings available</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 15,
  },
  listingCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  listingBusiness: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 3,
  },
  listingQuantity: {
    fontSize: 14,
    marginBottom: 3,
  },
  listingPrice: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  listingAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});

export default ListingsScreen;