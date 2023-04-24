import app from '../src/app'
import request from 'supertest'
import { ICar } from '../src/Interfaces'
import { model, Schema } from 'mongoose'
import { carsArray } from './utils/CarsMock'
import Connection from '../src/Models/Connection'
import { clearDatabase, closeDatabase } from './utils/db'

describe("GET request to all cars", () => {

    let VALID_ID: string;

    beforeAll(async () => {
        await Connection();
        await clearDatabase();
        const schema = new Schema({}, { strict: false, collection: 'cars'})
        const Car = model('CarTest', schema)
        let car = new Car(carsArray[0])
        await car.save()
        car = new Car(carsArray[1])
        const { _id } = await car.save()
        VALID_ID = _id
    })

    afterAll(async () => { await closeDatabase()})

    it("Can list all cars", async () => {
        const { body, statusCode } = await request(app).get('/cars')
        expect(statusCode).toEqual(200)
        const keys = ["id", "model", "year", "color", "buyValue", "doorsQty", "seatsQty"]
        
        body.forEach((car: ICar) => {
            keys.forEach((key) => {
                expect(car).toHaveProperty(key)
            })
        })
    })

    it("Can't list a nonexistent car", async () => {
        const { body, statusCode } = await request(app).get('/cars/1111222233330000bbbbdddd');
    
        expect(statusCode).toEqual(404);
        expect(body.message).toEqual('Car not found');
      });
    
      it("Can't list a car with invalid id", async () => {
        const { body, statusCode } = await request(app).get('/cars/INVALID_MONGO_ID');
    
        expect(statusCode).toEqual(422);
        expect(body.message).toEqual('Invalid mongo id');
      });

      it('Renders a car with a valid id', async () => {
        const { body, statusCode } = await request(app).get(`/cars/${VALID_ID}`);
        const keys = ["id", "model", "year", "color", "buyValue", "doorsQty", "seatsQty"]
        
        expect(statusCode).toEqual(200);
        keys.forEach((key) => { expect(body).toHaveProperty(key) });
      });
})