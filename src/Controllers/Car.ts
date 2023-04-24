import { Request, Response } from 'express';
import Car from '../Models/Car';
import ICar from '../Interfaces/ICar';

const convert = (object: ICar) => {
  const { _id: id, model, year, color, status, buyValue, doorsQty, seatsQty } = object;
  return { id, model, year, color, status, buyValue, doorsQty, seatsQty };
};

const create = async (req: Request, res: Response) => {
  const newObject = await Car.create({ 
    status: req.body.status ? req.body.status : false, ...req.body, 
  });
  const response = convert(newObject);
  return res.status(201).json(response);
};

const getAll = async (req: Request, res: Response) => {
  const result = await Car.find();
  const response = result.flatMap((i: ICar) => convert(i));
  return res.status(200).json(response);
};


export default { create, getAll };