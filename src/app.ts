import express from 'express';
import controller from './Controllers/vehicles';

const app = express();
app.use(express.Router());
app.use(express.json());

app.get('/cars', controller.getAll);
app.post('/cars', controller.create);

export default app;