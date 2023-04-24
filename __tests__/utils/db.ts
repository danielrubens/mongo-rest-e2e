import mongoose from 'mongoose';

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

export {clearDatabase, closeDatabase}