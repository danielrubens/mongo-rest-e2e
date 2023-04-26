import request from 'supertest'
import app from '../src/app'
import { closeDatabase, setUpTest } from './utils/db'
import { updatedCar, updatedMotorcycle } from './utils/'

const putDynamically = (vehicle: any) => {

    const updated = {cars: updatedCar, motorcycles: updatedMotorcycle} as any
    const element = {cars: "Car", motorcycles: "Motorcycle"} as any
   
    describe(`PUT request on route /${vehicle}/:id`, () => {
    
        let VALID_ID: string;
    
        beforeAll(async () => { VALID_ID = await setUpTest(vehicle) })
        afterAll(async () => { await closeDatabase() })
    
        it("Can't update a car with nonexistent id", async () => {
            const NON_EXISTENT = '1111222233330000ffffcccc'
            const {body, statusCode} = await request(app).put(`/${vehicle}/${NON_EXISTENT}`).send(updated[vehicle])
            
            expect(statusCode).toEqual(404)
            expect(body.message).toEqual(`${element[vehicle]} not found`)
        })
    
        it("Can't update a car with invalid Mongo id", async () => {
            const {body, statusCode} = await request(app).put(`/${vehicle}/INVALID`).send(updated[vehicle])
            expect(statusCode).toEqual(422)
            expect(body.message).toEqual("Invalid mongo id")
        })
    
        it("Can update a car successfully", async () => {
            const {body, statusCode} = await request(app).put(`/${vehicle}/${VALID_ID}`).send(updated[vehicle])
            const keyMoto = ["id", "model", "year", "color", "status", "buyValue", "category", "engineCapacity"]
            const keyCars = ["id", "model", "year", "color", "buyValue", "doorsQty", "seatsQty"]
            const options = {cars: keyCars, motorcycles: keyMoto} as any
            const keys = options[vehicle]
        
            expect(statusCode).toEqual(200);
            keys.forEach((key: any) => { expect(body).toHaveProperty(key) });
        })   
    })
}

putDynamically('cars')
putDynamically('motorcycles')