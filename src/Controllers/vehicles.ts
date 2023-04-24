import { Request, Response } from 'express';
import service, { convert } from '../Services/vehicles';
import { send } from '../Middlewares';
import { Motorcycle, Car } from '../Models';

const url = (req: Request) => {
  if (req.url.includes('cars')) return { model: Car, arg: 'Car', all: async () => Car.find() };
  return { model: Motorcycle, arg: 'Motorcycle', all: async () => Motorcycle.find() };
}; 

const vehicles = {
  create: async (req: Request, res: Response) => {
    const params = { status: req.body.status ? req.body.status : false, ...req.body };
    const inserted = await url(req).model.create(params);
    const response = convert(inserted, url(req).arg);
    send(res, response, 'insert');
  },
  
  getAll: async (req: Request, res: Response) => {
    const all = await url(req).all();
    const response = [] as any;
    all.forEach((i: any) => response.push(convert(i, url(req).arg)));
    send(res, response, 'ok');
  },

  getById: async (req: Request, res: Response) => {
    const response = await service.get(url(req).arg, req.params.id, 'byId', url(req).model);
    send(res, response);
  },
  
  update: async (req: Request, res: Response) => {
    const { model } = url(req);
    const response = await service.get(url(req).arg, req.params.id, 'update', model, req.body);
    send(res, response);
  },
};

export default vehicles;