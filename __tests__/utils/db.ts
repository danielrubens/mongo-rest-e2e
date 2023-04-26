import mongoose, { model, Schema } from 'mongoose';
import Connection from '../../src/Models/Connection';
import { carsArray } from './CarsMock';
import { motorcyclesArray } from './MotorcyclesMock';


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

const setUpTest = async (vehicle: string) => {
  await Connection();
  await clearDatabase();
  const array = { cars: carsArray, motorcycles: motorcyclesArray} as any
  const schema = new Schema({}, { strict: false, collection: vehicle})
  const Vehicle = model(`${vehicle}Test`, schema)
  let object = new Vehicle(array[vehicle][0])
  await object.save()
  object = new Vehicle(array[vehicle][1])
  const { _id } = await object.save()
  return _id
}

export {clearDatabase, closeDatabase, setUpTest}