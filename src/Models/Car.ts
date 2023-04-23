import mongoose from 'mongoose';
import ICar from '../Interfaces/ICar';

const Car = new mongoose.Schema<ICar>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: true },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
});

export default mongoose.model('Car', Car);