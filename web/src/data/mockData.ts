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

const generateListings = () => {
  const categories = ['vegetables', 'fruits', 'bakery', 'dairy', 'meat', 'prepared', 'frozen', 'pantry'];
  const foodItems = {
    vegetables: [
      { name: 'Organic Carrots Bundle', emoji: '🥕', basePrice: 3.99, weight: 1.2 },
      { name: 'Fresh Broccoli Crowns', emoji: '🥦', basePrice: 2.49, weight: 0.8 },
      { name: 'Mixed Bell Peppers', emoji: '🫑', basePrice: 4.99, weight: 1.0 },
      { name: 'Baby Spinach Leaves', emoji: '🥬', basePrice: 2.99, weight: 0.3 },
      { name: 'Sweet Potatoes', emoji: '🍠', basePrice: 3.49, weight: 1.5 },
      { name: 'Cherry Tomatoes', emoji: '🍅', basePrice: 3.99, weight: 0.5 },
      { name: 'Fresh Cucumber', emoji: '🥒', basePrice: 1.99, weight: 0.4 },
      { name: 'Red Onions', emoji: '🧅', basePrice: 2.49, weight: 1.0 },
      { name: 'Mushroom Selection', emoji: '🍄', basePrice: 4.49, weight: 0.6 },
      { name: 'Lettuce Hearts', emoji: '🥬', basePrice: 2.99, weight: 0.4 },
      { name: 'Asparagus Spears', emoji: '🌿', basePrice: 5.99, weight: 0.5 },
      { name: 'Courgettes', emoji: '🥒', basePrice: 2.99, weight: 0.8 }
    ],
    fruits: [
      { name: 'Organic Apples', emoji: '🍎', basePrice: 4.99, weight: 1.5 },
      { name: 'Ripe Bananas', emoji: '🍌', basePrice: 2.49, weight: 1.2 },
      { name: 'Fresh Strawberries', emoji: '🍓', basePrice: 3.99, weight: 0.4 },
      { name: 'Juicy Oranges', emoji: '🍊', basePrice: 3.49, weight: 1.8 },
      { name: 'Sweet Grapes', emoji: '🍇', basePrice: 4.49, weight: 0.8 },
      { name: 'Ripe Avocados', emoji: '🥑', basePrice: 5.99, weight: 0.6 },
      { name: 'Fresh Pineapple', emoji: '🍍', basePrice: 2.99, weight: 1.5 },
      { name: 'Kiwi Fruits', emoji: '🥝', basePrice: 3.99, weight: 0.5 },
      { name: 'Mango Selection', emoji: '🥭', basePrice: 4.99, weight: 0.8 },
      { name: 'Blueberries', emoji: '🫐', basePrice: 4.49, weight: 0.3 },
      { name: 'Peaches', emoji: '🍑', basePrice: 3.99, weight: 1.0 },
      { name: 'Pears', emoji: '🍐', basePrice: 3.49, weight: 1.2 }
    ],
    bakery: [
      { name: 'Sourdough Bread', emoji: '🍞', basePrice: 3.99, weight: 0.8 },
      { name: 'Croissants Pack', emoji: '🥐', basePrice: 4.49, weight: 0.4 },
      { name: 'Bagels Selection', emoji: '🥯', basePrice: 3.49, weight: 0.6 },
      { name: 'Danish Pastries', emoji: '🧁', basePrice: 5.99, weight: 0.5 },
      { name: 'Artisan Rolls', emoji: '🥖', basePrice: 2.99, weight: 0.4 },
      { name: 'Muffin Variety', emoji: '🧁', basePrice: 4.99, weight: 0.8 },
      { name: 'Pizza Dough', emoji: '🍕', basePrice: 2.49, weight: 0.5 },
      { name: 'Cake Slices', emoji: '🍰', basePrice: 6.99, weight: 0.6 },
      { name: 'Cookies Pack', emoji: '🍪', basePrice: 3.99, weight: 0.3 },
      { name: 'Donuts Box', emoji: '🍩', basePrice: 5.49, weight: 0.7 }
    ],
    dairy: [
      { name: 'Fresh Milk', emoji: '🥛', basePrice: 1.99, weight: 2.3 },
      { name: 'Greek Yogurt', emoji: '🥛', basePrice: 3.49, weight: 0.5 },
      { name: 'Cheddar Cheese', emoji: '🧀', basePrice: 4.99, weight: 0.4 },
      { name: 'Butter Block', emoji: '🧈', basePrice: 2.99, weight: 0.25 },
      { name: 'Cream Cheese', emoji: '🧀', basePrice: 2.49, weight: 0.2 },
      { name: 'Mozzarella', emoji: '🧀', basePrice: 3.99, weight: 0.3 },
      { name: 'Double Cream', emoji: '🥛', basePrice: 2.99, weight: 0.3 },
      { name: 'Eggs Dozen', emoji: '🥚', basePrice: 2.49, weight: 0.7 }
    ],
    meat: [
      { name: 'Chicken Breast', emoji: '🍗', basePrice: 7.99, weight: 1.0 },
      { name: 'Beef Mince', emoji: '🥩', basePrice: 5.99, weight: 0.8 },
      { name: 'Pork Chops', emoji: '🥩', basePrice: 6.49, weight: 0.9 },
      { name: 'Salmon Fillets', emoji: '🐟', basePrice: 8.99, weight: 0.6 },
      { name: 'Turkey Slices', emoji: '🦃', basePrice: 4.99, weight: 0.3 },
      { name: 'Bacon Pack', emoji: '🥓', basePrice: 3.99, weight: 0.4 },
      { name: 'Lamb Chops', emoji: '🐑', basePrice: 9.99, weight: 0.7 },
      { name: 'Sausages', emoji: '🌭', basePrice: 4.49, weight: 0.5 }
    ],
    prepared: [
      { name: 'Ready Pasta Meals', emoji: '🍝', basePrice: 4.99, weight: 0.8 },
      { name: 'Sandwich Selection', emoji: '🥪', basePrice: 5.99, weight: 0.6 },
      { name: 'Soup Containers', emoji: '🍲', basePrice: 3.99, weight: 1.0 },
      { name: 'Salad Bowls', emoji: '🥗', basePrice: 4.49, weight: 0.5 },
      { name: 'Curry Ready Meals', emoji: '🍛', basePrice: 6.99, weight: 0.9 },
      { name: 'Pizza Slices', emoji: '🍕', basePrice: 3.49, weight: 0.4 },
      { name: 'Wraps & Rolls', emoji: '🌯', basePrice: 4.99, weight: 0.6 }
    ],
    frozen: [
      { name: 'Frozen Vegetables', emoji: '🥶', basePrice: 2.99, weight: 1.0 },
      { name: 'Ice Cream Tubs', emoji: '🍦', basePrice: 3.99, weight: 1.0 },
      { name: 'Frozen Berries', emoji: '🫐', basePrice: 4.49, weight: 0.5 },
      { name: 'Fish Fingers', emoji: '🐟', basePrice: 3.49, weight: 0.6 },
      { name: 'Frozen Pizza', emoji: '🍕', basePrice: 2.99, weight: 0.8 }
    ],
    pantry: [
      { name: 'Rice Bags', emoji: '🍚', basePrice: 3.99, weight: 2.0 },
      { name: 'Pasta Packs', emoji: '🍝', basePrice: 1.99, weight: 1.0 },
      { name: 'Canned Tomatoes', emoji: '🥫', basePrice: 1.49, weight: 0.8 },
      { name: 'Olive Oil', emoji: '🫒', basePrice: 4.99, weight: 0.5 },
      { name: 'Cereal Boxes', emoji: '🥣', basePrice: 3.49, weight: 0.8 }
    ]
  };

  const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh', 'Glasgow', 'Liverpool', 'Cardiff'];
  const listings = [];

  let id = 1;
  categories.forEach(category => {
    foodItems[category].forEach(item => {
      for (let i = 0; i < Math.ceil(100 / (categories.length * 8)); i++) {
        const store = mockStores[Math.floor(Math.random() * mockStores.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const quantity = Math.floor(Math.random() * 20) + 1;
        const discountPercent = Math.floor(Math.random() * 60) + 20;
        const discountedPrice = item.basePrice * (1 - discountPercent / 100);
        const expiresIn = Math.floor(Math.random() * 24) + 1; // 1-24 hours

        listings.push({
          id: id++,
          title: item.name,
          description: `Fresh ${item.name.toLowerCase()}, perfect quality with minor imperfections. Great value!`,
          quantity,
          originalPrice: item.basePrice,
          discountedPrice: Math.round(discountedPrice * 100) / 100,
          weight: item.weight,
          category,
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

        if (listings.length >= 100) break;
      }
      if (listings.length >= 100) break;
    });
    if (listings.length >= 100) break;
  });

  return listings.slice(0, 100);
};

export const mockListings = generateListings();

// Analytics data for admin
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

  // Simulate sold items
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
    co2Saved: Math.round(totalWeight * 2.5 * 100) / 100 // Approximate CO2 savings
  };
};