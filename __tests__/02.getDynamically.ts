import app from '../src/app'
import request from 'supertest'
import { closeDatabase, setUpTest } from './utils/db'


const getDynamically = (vehicle: any) => {

    describe(`GET request on route /${vehicle}`, () => {
    
        let VALID_ID: string;

        const keyMoto = ["id", "model", "year", "color", "status", "buyValue", "category", "engineCapacity"]
        const keyCars = ["id", "model", "year", "color", "buyValue", "doorsQty", "seatsQty"]
        const options = {cars: keyCars, motorcycles: keyMoto} as any
        const keys = options[vehicle]
    
        beforeAll(async () => { VALID_ID = await setUpTest(vehicle) })
    
        afterAll(async () => { await closeDatabase()})
    
        it("Can list all ${vehicle}s", async () => {
            const { body, statusCode } = await request(app).get(`/${vehicle}`)
            expect(statusCode).toEqual(200)
            body.forEach((el: any) => {
                keys.forEach((key: any) => {
                    expect(el).toHaveProperty(key)
                })
            })
        })
    
        it(`Can't list a nonexistent ${vehicle}`, async () => {
            const { body, statusCode } = await request(app).get(`/${vehicle}/1111222233330000bbbbdddd`);
        
            expect(statusCode).toEqual(404);
            const element = {cars: 'Car', motorcycles: 'Motorcycle'} as any
            expect(body.message).toEqual(`${element[vehicle]} not found`);
          });
        
          it(`Can't list a ${vehicle} with invalid id`, async () => {
            const { body, statusCode } = await request(app).get(`/${vehicle}/INVALID_MONGO_ID`);
        
            expect(statusCode).toEqual(422);
            expect(body.message).toEqual('Invalid mongo id');
          });
    
          it(`Renders a ${vehicle} with a valid id`, async () => {
            const { body, statusCode } = await request(app).get(`/${vehicle}/${VALID_ID}`);
            
            expect(statusCode).toEqual(200);
            keys.forEach((key: any) => { expect(body).toHaveProperty(key) });
          });
    })
}

getDynamically('cars')
getDynamically('motorcycles')