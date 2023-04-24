import { Response } from 'express';
import { Types } from 'mongoose';

const send = (res: Response, object:any, method?: string) => {
  if (method === 'ok') return res.status(200).json(object);
  if (method === 'insert') return res.status(201).json(object);
  res.status(object.code).json(object.message);
};

const checkId = (id: any, found: any, vehicle: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return { code: 422, message: { message: 'Invalid mongo id' } };
  } 
  if (!found) return { code: 404, message: { message: `${vehicle} not found` } };
  return false;
};

export { send, checkId };