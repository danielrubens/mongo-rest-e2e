import request from 'supertest'
import app from '../src/app'
import Connection from '../src/Models/Connection'
import { clearDatabase, closeDatabase } from './utils/db'
import { validMotorcycle } from './utils/MotorcyclesMock'


describe("POST request on route /motorcycles", () => {

    beforeEach(() => console.info(expect.getState().currentTestName, 'Testing... \n\n'))

    it("Interface IMotorcycle exists", () =>{
        expect('Motorcycles/exists-interface').toCompile()
    })

    it("Interface has its specific attributes", () => {
        expect('Motorcycles/correct-interface').toCompile()
    })

    it("Verifies common attributes between interfaces", () => {
        expect('Vehicle/exists-interface').toCompile();
        expect('Vehicle/correct-interface').toCompile();
        expect('Vehicle/correct-interface-with-status').toCompile();
        expect('Vehicle/incorrect-interface-with-car-attributes').notToCompile();
        expect('Vehicle/incorrect-interface-with-motorcycle-attributes').notToCompile();
    })

    it("Exists domain class representing Motorcycle object", () => {
        expect('Cars/exists-domain').toCompile()
    })

    it("Ensures protected attributes", () => {
        expect('Motorcycles/exists-domain').toCompile();
        expect('Motorcycles/private-attributes-domain-instance').notToCompile();
        expect('Motorcycles/private-attributes-domain-inheritance').toCompile();
    })

    it("Exists Abstract ODM representing data abstraction", () => {
        expect('Models/exists-model').toCompile();
        expect('Models/correct-inheritance').toCompile();
    })

    it("Can do a POST request successfully" , async () => {
        await Connection()
        await clearDatabase()

        const { body, statusCode } = await request(app).post('/motorcycles').send(validMotorcycle)
        const keys = ["id", "model", "year", "color", "status", "buyValue", "category", "engineCapacity"]

        expect(statusCode).toEqual(201)
        keys.forEach((i) => { expect(body).toHaveProperty(i)})
    })

    afterAll(async() => { await clearDatabase() })
})