import express from 'express';
import controller from './Controllers/Car';

const app = express();
app.use(express.Router());
app.use(express.json());

app.post('/cars', controller.create);

export default app;