import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const CreateListingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '1',
    originalPrice: '',
    discountedPrice: '',
    pickupStart: '',
    pickupEnd: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.quantity || !formData.pickupStart || !formData.pickupEnd) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/listings`, {
        ...formData,
        quantity: parseInt(formData.quantity),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : null,
      });
      
      Alert.alert('Success', 'Listing created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(value) => updateField('title', value)}
          placeholder="Enter food title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(value) => updateField('description', value)}
          placeholder="Describe the food"
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Quantity *</Text>
        <TextInput
          style={styles.input}
          value={formData.quantity}
          onChangeText={(value) => updateField('quantity', value)}
          placeholder="1"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Original Price (£)</Text>
        <TextInput
          style={styles.input}
          value={formData.originalPrice}
          onChangeText={(value) => updateField('originalPrice', value)}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Discounted Price (£)</Text>
        <TextInput
          style={styles.input}
          value={formData.discountedPrice}
          onChangeText={(value) => updateField('discountedPrice', value)}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Pickup Start *</Text>
        <TextInput
          style={styles.input}
          value={formData.pickupStart}
          onChangeText={(value) => updateField('pickupStart', value)}
          placeholder="YYYY-MM-DD HH:MM"
        />

        <Text style={styles.label}>Pickup End *</Text>
        <TextInput
          style={styles.input}
          value={formData.pickupEnd}
          onChangeText={(value) => updateField('pickupEnd', value)}
          placeholder="YYYY-MM-DD HH:MM"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(value) => updateField('address', value)}
          placeholder="Pickup address"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Creating...' : 'Create Listing'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateListingScreen;