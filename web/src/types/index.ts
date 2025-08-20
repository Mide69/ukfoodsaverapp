export interface User {
  id: number;
  firebase_uid: string;
  email: string;
  name: string;
  user_type: 'consumer' | 'business' | 'admin';
  phone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface FoodListing {
  id: number;
  business_id: number;
  title: string;
  description?: string;
  quantity: number;
  original_price?: number;
  discounted_price?: number;
  pickup_start: string;
  pickup_end: string;
  status: 'available' | 'reserved' | 'completed';
  latitude?: number;
  longitude?: number;
  address?: string;
  business_name?: string;
  business_phone?: string;
  created_at: string;
}

export interface Reservation {
  id: number;
  listing_id: number;
  user_id: number;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_intent_id?: string;
  title?: string;
  description?: string;
  pickup_start?: string;
  pickup_end?: string;
  address?: string;
  business_name?: string;
  created_at: string;
}