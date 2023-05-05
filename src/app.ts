import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import vehicles from './Controllers/vehicles';

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Vehicles API',
      description: 'Vehicles API Description',
      contact: {
        name: 'Daniel Rubens',
      },
      servers: ['http://localhost:3001'],       
      version: '0.1',
    },
  },
  // ['.routes/*.ts']   
  apis: ['src/app.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.Router());
app.use(express.json());

// Routes
/** 
 * @swagger
 * /cars:
 *  get:
 *    description: Use descriptions
 *    responses:
 *      '200':
 *        description: Returns all cars on the database
*/
app.get('/cars', vehicles.getAll);

/** 
 * @swagger
 * /cars/:id:
 *  get:
 *    description: Get element by id
 *    responses:
 *      '200':
 *        description: Returns element whose id is equal to the route parameter 
*/
app.get('/cars/:id', vehicles.getById);

/** 
 * @swagger
 * /cars:
 *  post:
 *    description: Create an element
 *    responses:
 *      '201':
 *        description: Returns element created 
*/
app.post('/cars', vehicles.create);

/** 
 * @swagger
 * /cars/:id:
 *  put:
 *    description: Update an element
 *    responses:
 *      '200':
 *        description: Returns element updated
*/
app.put('/cars/:id', vehicles.update);

/** 
 * @swagger
 * /motorcycles:
 *  get:
 *    description: Use descriptions
 *    responses:
 *      '200':
 *        description: Returns all motorcycles on the database
*/
app.get('/motorcycles', vehicles.getAll);

/** 
 * @swagger
 * /motorcycles/:id:
 *  get:
 *    description: Get element by id
 *    responses:
 *      '200':
 *        description: Returns element whose id is equal to the route parameter 
*/
app.get('/motorcycles/:id', vehicles.getById);

/** 
 * @swagger
 * /motorcycles:
 *  post:
 *    description: Create an element
 *    responses:
 *      '201':
 *        description: Returns element created 
*/
app.post('/motorcycles', vehicles.create);

/** 
 * @swagger
 * /motorcycles/:id:
 *  put:
 *    description: Update an element
 *    responses:
 *      '200':
 *        description: Returns element updated
*/
app.put('/motorcycles/:id', vehicles.update);

export default app;