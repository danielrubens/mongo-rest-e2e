import app from '../src/app'
import request from 'supertest'
import { ICar } from '../src/Interfaces'
import { closeDatabase, setUpTest } from './utils/db'

describe("GET request on route /cars", () => {

    let VALID_ID: string;

    beforeAll(async () => { VALID_ID = await setUpTest('cars') })

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