import request from 'supertest'
import app from '../src/app'
import { validCar } from './utils/CarsMock'
import Connection from '../src/Models/Connection'
import { clearDatabase, closeDatabase } from './utils/db'

describe("Post on route /cars", () => {

    beforeEach(() => console.info(expect.getState().currentTestName, "Testing... \n\n"))

    it("Interface ICar exists", () =>{
        expect('Cars/exists-interface').toCompile()
    })

    it("Interface has its specific attributes", () => {
        expect('Cars/correct-interface').toCompile()
        expect('Cars/correct-interface-with-status').toCompile()
    })

    it("Domain's attributes are accessible for its subclasses", () => {
        expect('Cars/exists-domain').toCompile()
        expect('Cars/protected-attributes-domain-instance').notToCompile()
        expect('Cars/protected-attributes-domain-inheritance').toCompile()
    })

    it("Domain receives as parameter an interface Icar", () => {
        expect('Cars/correct-instance').toCompile()
    })

    it("Can post a car successfully", async () => {
        await Connection()
        await clearDatabase()

        const {body, statusCode} = await request(app).post('/cars').send(validCar)
        const keys = ["id", "model", "year", "color", "status", "buyValue", "doorsQty", "seatsQty"]

        expect(statusCode).toEqual(201)
        expect(body.status).toEqual(false)
        keys.forEach((i) => { expect(body).toHaveProperty(i)})
    })

    afterAll(async () => await closeDatabase())
})