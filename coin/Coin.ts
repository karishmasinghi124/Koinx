const axios = require('axios');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.szzhugl.mongodb.net/karishma', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const coinSchema = new mongoose.Schema({
  _id: Object,
  id: String,
  name: String,
  symbol: String,
});

const Coin = mongoose.model('coins', coinSchema);

async function updateList() {
  try {
    
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false');

    const coins = response.data;

    // Update or insert each coin into the MongoDB coins collection
    for (const coin of coins) {
      await Coin.findOneAndUpdate({ id: coin.id }, coin, { upsert: true });
    }

    console.log('List updated:', coins.length, 'coins');



  } catch (error) {
    console.error('Error updating list:', error);
  }
}

// Define the interval for updating the list (1 hour = 3600000 milliseconds)
const interval = 3600000; // 1 hour

// Set up the interval to run the updateList function every 1 hour
const intervalId = setInterval(updateList, interval);

// Optionally, run the updateList function immediately
updateList();
