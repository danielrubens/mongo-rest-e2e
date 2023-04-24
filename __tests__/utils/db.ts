import mongoose, { model, Schema } from 'mongoose';
import Connection from '../../src/Models/Connection';
import { carsArray } from './CarsMock';

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}

const clearDatabase = async () => {
  const collections = await mongoose.connection.db.collections()
  for(let i of collections){
    await i.deleteMany({});
  }
}

const setUpTest = async () => {
  await Connection();
  await clearDatabase();
  const schema = new Schema({}, { strict: false, collection: 'cars'})
  const Car = model('CarTest', schema)
  let car = new Car(carsArray[0])
  await car.save()
  car = new Car(carsArray[1])
  const { _id } = await car.save()
  return _id
}

export {clearDatabase, closeDatabase, setUpTest}