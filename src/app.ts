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
 *        description: A successfull description
*/
app.get('/cars', vehicles.getAll);

app.get('/cars/:id', vehicles.getById);
app.post('/cars', vehicles.create);
app.put('/cars/:id', vehicles.update);

app.get('/motorcycles', vehicles.getAll);
app.get('/motorcycles/:id', vehicles.getById);
app.post('/motorcycles', vehicles.create);
app.put('/motorcycles/:id', vehicles.update);

export default app;