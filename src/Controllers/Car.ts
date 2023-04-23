import { Request, Response } from 'express';
import Car from '../Models/Car';

const create = async (req: Request, res: Response) => {
  const newObject = await Car.create({ 
    status: req.body.status ? req.body.status : false, ...req.body, 
  });
  const { _id: id, model, year, color, status, buyValue, doorsQty, seatsQty } = newObject;
  const response = { id, model, year, color, status, buyValue, doorsQty, seatsQty };

  return res.status(201).json(response);
};

export default { create };