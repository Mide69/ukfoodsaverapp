export const mockStores = [
  { id: 1, name: 'Tesco Express', logo: '🛒', location: 'London', rating: 4.5 },
  { id: 2, name: 'Sainsbury\'s Local', logo: '🏪', location: 'Manchester', rating: 4.3 },
  { id: 3, name: 'ASDA Superstore', logo: '🏬', location: 'Birmingham', rating: 4.2 },
  { id: 4, name: 'Morrisons', logo: '🛍️', location: 'Leeds', rating: 4.4 },
  { id: 5, name: 'The Green Grocer', logo: '🥬', location: 'Bristol', rating: 4.8 },
  { id: 6, name: 'Farm Fresh Market', logo: '🚜', location: 'Edinburgh', rating: 4.7 },
  { id: 7, name: 'Waitrose', logo: '🌟', location: 'London', rating: 4.6 },
  { id: 8, name: 'Co-op Food', logo: '🤝', location: 'Glasgow', rating: 4.1 },
  { id: 9, name: 'Iceland', logo: '❄️', location: 'Liverpool', rating: 4.0 },
  { id: 10, name: 'Marks & Spencer', logo: '🎯', location: 'Cardiff', rating: 4.5 }
];

const foodItems = [
  { name: 'Organic Carrots Bundle', emoji: '🥕', basePrice: 3.99, weight: 1.2, category: 'vegetables' },
  { name: 'Fresh Broccoli Crowns', emoji: '🥦', basePrice: 2.49, weight: 0.8, category: 'vegetables' },
  { name: 'Mixed Bell Peppers', emoji: '🫑', basePrice: 4.99, weight: 1.0, category: 'vegetables' },
  { name: 'Baby Spinach Leaves', emoji: '🥬', basePrice: 2.99, weight: 0.3, category: 'vegetables' },
  { name: 'Sweet Potatoes', emoji: '🍠', basePrice: 3.49, weight: 1.5, category: 'vegetables' },
  { name: 'Cherry Tomatoes', emoji: '🍅', basePrice: 3.99, weight: 0.5, category: 'vegetables' },
  { name: 'Fresh Cucumber', emoji: '🥒', basePrice: 1.99, weight: 0.4, category: 'vegetables' },
  { name: 'Red Onions', emoji: '🧅', basePrice: 2.49, weight: 1.0, category: 'vegetables' },
  { name: 'Mushroom Selection', emoji: '🍄', basePrice: 4.49, weight: 0.6, category: 'vegetables' },
  { name: 'Lettuce Hearts', emoji: '🥬', basePrice: 2.99, weight: 0.4, category: 'vegetables' },
  { name: 'Asparagus Spears', emoji: '🌿', basePrice: 5.99, weight: 0.5, category: 'vegetables' },
  { name: 'Courgettes', emoji: '🥒', basePrice: 2.99, weight: 0.8, category: 'vegetables' },
  
  { name: 'Organic Apples', emoji: '🍎', basePrice: 4.99, weight: 1.5, category: 'fruits' },
  { name: 'Ripe Bananas', emoji: '🍌', basePrice: 2.49, weight: 1.2, category: 'fruits' },
  { name: 'Fresh Strawberries', emoji: '🍓', basePrice: 3.99, weight: 0.4, category: 'fruits' },
  { name: 'Juicy Oranges', emoji: '🍊', basePrice: 3.49, weight: 1.8, category: 'fruits' },
  { name: 'Sweet Grapes', emoji: '🍇', basePrice: 4.49, weight: 0.8, category: 'fruits' },
  { name: 'Ripe Avocados', emoji: '🥑', basePrice: 5.99, weight: 0.6, category: 'fruits' },
  { name: 'Fresh Pineapple', emoji: '🍍', basePrice: 2.99, weight: 1.5, category: 'fruits' },
  { name: 'Kiwi Fruits', emoji: '🥝', basePrice: 3.99, weight: 0.5, category: 'fruits' },
  { name: 'Mango Selection', emoji: '🥭', basePrice: 4.99, weight: 0.8, category: 'fruits' },
  { name: 'Blueberries', emoji: '🫐', basePrice: 4.49, weight: 0.3, category: 'fruits' },
  { name: 'Peaches', emoji: '🍑', basePrice: 3.99, weight: 1.0, category: 'fruits' },
  { name: 'Pears', emoji: '🍐', basePrice: 3.49, weight: 1.2, category: 'fruits' },
  
  { name: 'Sourdough Bread', emoji: '🍞', basePrice: 3.99, weight: 0.8, category: 'bakery' },
  { name: 'Croissants Pack', emoji: '🥐', basePrice: 4.49, weight: 0.4, category: 'bakery' },
  { name: 'Bagels Selection', emoji: '🥯', basePrice: 3.49, weight: 0.6, category: 'bakery' },
  { name: 'Danish Pastries', emoji: '🧁', basePrice: 5.99, weight: 0.5, category: 'bakery' },
  { name: 'Artisan Rolls', emoji: '🥖', basePrice: 2.99, weight: 0.4, category: 'bakery' },
  { name: 'Muffin Variety', emoji: '🧁', basePrice: 4.99, weight: 0.8, category: 'bakery' },
  { name: 'Pizza Dough', emoji: '🍕', basePrice: 2.49, weight: 0.5, category: 'bakery' },
  { name: 'Cake Slices', emoji: '🍰', basePrice: 6.99, weight: 0.6, category: 'bakery' },
  { name: 'Cookies Pack', emoji: '🍪', basePrice: 3.99, weight: 0.3, category: 'bakery' },
  { name: 'Donuts Box', emoji: '🍩', basePrice: 5.49, weight: 0.7, category: 'bakery' },
  
  { name: 'Fresh Milk', emoji: '🥛', basePrice: 1.99, weight: 2.3, category: 'dairy' },
  { name: 'Greek Yogurt', emoji: '🥛', basePrice: 3.49, weight: 0.5, category: 'dairy' },
  { name: 'Cheddar Cheese', emoji: '🧀', basePrice: 4.99, weight: 0.4, category: 'dairy' },
  { name: 'Butter Block', emoji: '🧈', basePrice: 2.99, weight: 0.25, category: 'dairy' },
  { name: 'Cream Cheese', emoji: '🧀', basePrice: 2.49, weight: 0.2, category: 'dairy' },
  { name: 'Mozzarella', emoji: '🧀', basePrice: 3.99, weight: 0.3, category: 'dairy' },
  { name: 'Double Cream', emoji: '🥛', basePrice: 2.99, weight: 0.3, category: 'dairy' },
  { name: 'Eggs Dozen', emoji: '🥚', basePrice: 2.49, weight: 0.7, category: 'dairy' },
  
  { name: 'Chicken Breast', emoji: '🍗', basePrice: 7.99, weight: 1.0, category: 'meat' },
  { name: 'Beef Mince', emoji: '🥩', basePrice: 5.99, weight: 0.8, category: 'meat' },
  { name: 'Pork Chops', emoji: '🥩', basePrice: 6.49, weight: 0.9, category: 'meat' },
  { name: 'Salmon Fillets', emoji: '🐟', basePrice: 8.99, weight: 0.6, category: 'meat' },
  { name: 'Turkey Slices', emoji: '🦃', basePrice: 4.99, weight: 0.3, category: 'meat' },
  { name: 'Bacon Pack', emoji: '🥓', basePrice: 3.99, weight: 0.4, category: 'meat' },
  { name: 'Lamb Chops', emoji: '🐑', basePrice: 9.99, weight: 0.7, category: 'meat' },
  { name: 'Sausages', emoji: '🌭', basePrice: 4.49, weight: 0.5, category: 'meat' },
  
  { name: 'Ready Pasta Meals', emoji: '🍝', basePrice: 4.99, weight: 0.8, category: 'prepared' },
  { name: 'Sandwich Selection', emoji: '🥪', basePrice: 5.99, weight: 0.6, category: 'prepared' },
  { name: 'Soup Containers', emoji: '🍲', basePrice: 3.99, weight: 1.0, category: 'prepared' },
  { name: 'Salad Bowls', emoji: '🥗', basePrice: 4.49, weight: 0.5, category: 'prepared' },
  { name: 'Curry Ready Meals', emoji: '🍛', basePrice: 6.99, weight: 0.9, category: 'prepared' },
  { name: 'Pizza Slices', emoji: '🍕', basePrice: 3.49, weight: 0.4, category: 'prepared' },
  { name: 'Wraps & Rolls', emoji: '🌯', basePrice: 4.99, weight: 0.6, category: 'prepared' },
  
  { name: 'Frozen Vegetables', emoji: '🥶', basePrice: 2.99, weight: 1.0, category: 'frozen' },
  { name: 'Ice Cream Tubs', emoji: '🍦', basePrice: 3.99, weight: 1.0, category: 'frozen' },
  { name: 'Frozen Berries', emoji: '🫐', basePrice: 4.49, weight: 0.5, category: 'frozen' },
  { name: 'Fish Fingers', emoji: '🐟', basePrice: 3.49, weight: 0.6, category: 'frozen' },
  { name: 'Frozen Pizza', emoji: '🍕', basePrice: 2.99, weight: 0.8, category: 'frozen' },
  
  { name: 'Rice Bags', emoji: '🍚', basePrice: 3.99, weight: 2.0, category: 'pantry' },
  { name: 'Pasta Packs', emoji: '🍝', basePrice: 1.99, weight: 1.0, category: 'pantry' },
  { name: 'Canned Tomatoes', emoji: '🥫', basePrice: 1.49, weight: 0.8, category: 'pantry' },
  { name: 'Olive Oil', emoji: '🫒', basePrice: 4.99, weight: 0.5, category: 'pantry' },
  { name: 'Cereal Boxes', emoji: '🥣', basePrice: 3.49, weight: 0.8, category: 'pantry' }
];

const generateListings = () => {
  const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh', 'Glasgow', 'Liverpool', 'Cardiff'];
  const listings: any[] = [];

  let id = 1;
  for (let i = 0; i < 100 && i < foodItems.length; i++) {
    const item = foodItems[i % foodItems.length];
    const store = mockStores[Math.floor(Math.random() * mockStores.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const quantity = Math.floor(Math.random() * 20) + 1;
    const discountPercent = Math.floor(Math.random() * 60) + 20;
    const discountedPrice = item.basePrice * (1 - discountPercent / 100);
    const expiresIn = Math.floor(Math.random() * 24) + 1;

    listings.push({
      id: id++,
      title: item.name,
      description: `Fresh ${item.name.toLowerCase()}, perfect quality with minor imperfections. Great value!`,
      quantity,
      originalPrice: item.basePrice,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      weight: item.weight,
      category: item.category,
      store,
      image: item.emoji,
      imageUrl: null,
      location,
      pickupStart: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      pickupEnd: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + expiresIn * 60 * 60 * 1000).toISOString(),
      status: 'available',
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return listings;
};

export const mockListings = generateListings();

export const getAnalytics = (period: 'day' | 'week' | 'month' | 'year') => {
  const now = new Date();
  let startDate: Date;
  
  switch (period) {
    case 'day':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'year':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
  }

  const soldItems = mockListings.filter(item => 
    new Date(item.createdAt) >= startDate && Math.random() > 0.7
  );

  const totalWeight = soldItems.reduce((sum, item) => sum + (item.weight * Math.floor(item.quantity * 0.6)), 0);
  const totalValue = soldItems.reduce((sum, item) => sum + (item.originalPrice * Math.floor(item.quantity * 0.6)), 0);
  const totalSavings = soldItems.reduce((sum, item) => sum + ((item.originalPrice - item.discountedPrice) * Math.floor(item.quantity * 0.6)), 0);

  return {
    period,
    foodSavedKg: Math.round(totalWeight * 100) / 100,
    foodSavedValue: Math.round(totalValue * 100) / 100,
    customerSavings: Math.round(totalSavings * 100) / 100,
    itemsSold: soldItems.length,
    co2Saved: Math.round(totalWeight * 2.5 * 100) / 100
  };
};