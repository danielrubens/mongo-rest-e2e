import request from 'supertest'
import app from '../src/app'
import { closeDatabase, setUpTest } from './utils/db'
import { updatedCar, validCar } from './utils/CarsMock'

describe("PUT request on route /cars/:id", () => {

    let VALID_ID: string;

    beforeAll(async () => { VALID_ID = await setUpTest() })
    afterAll(async () => { await closeDatabase() })

    it("Can't update a car with nonexistent id", async () => {
        const NON_EXISTENT = '1111222233330000ffffcccc'
        const {body, statusCode} = await request(app).put(`/cars/${NON_EXISTENT}`).send(updatedCar)
        
        expect(statusCode).toEqual(404)
        expect(body.message).toEqual("Car not found")
    })

    it("Can't update a car with invalid Mongo id", async () => {
        const {body, statusCode} = await request(app).put('/cars/INVALID').send(updatedCar)
        expect(statusCode).toEqual(422)
        expect(body.message).toEqual("Invalid mongo id")
    })

    it("Can update a car successfully", async () => {
        const {body, statusCode} = await request(app).put(`/cars/${VALID_ID}`).send(updatedCar)
        const keys = ["id", "model", "year", "color", "buyValue", "doorsQty", "seatsQty"]
        
        expect(statusCode).toEqual(200);
        keys.forEach((key) => { expect(body).toHaveProperty(key) });
    })



})