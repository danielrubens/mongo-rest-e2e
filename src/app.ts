import express from 'express';
import vehicles from './Controllers/vehicles';

const app = express();
app.use(express.Router());
app.use(express.json());

app.get('/cars', vehicles.getAll);
app.get('/cars/:id', vehicles.getById);
app.post('/cars', vehicles.create);
app.put('/cars/:id', vehicles.update);

app.get('/motorcycles', vehicles.getAll);
app.get('/motorcycles/:id', vehicles.getById);
app.post('/motorcycles', vehicles.create);
app.put('/motorcycles/:id', vehicles.update);

export default app;