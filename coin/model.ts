import * as mongoose from 'mongoose';

export const CoinSchema = new mongoose.Schema({
  id: String,
  name: String,
  symbol: String,
});

export interface Coin extends mongoose.Document {
  id: string;
  name: string;
  symbol: string;
}
