import request from 'supertest'
import { model, Schema } from 'mongoose'
import { ICar } from '../src/Interfaces'
import app from '../src/app'
import Connection from '../src/Models/Connection'
import { clearDatabase, closeDatabase } from './utils/db'
import { carsArray } from './utils/CarsMock'

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
})