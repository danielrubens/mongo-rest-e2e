import { ICar, IMotorcycle } from '../Interfaces';
import { Car, Motorcycle } from '../Models';
import { checkId } from '../Middlewares';

const car = (object: ICar | any) => {
  const { _id: id, model, year, color, status, buyValue, doorsQty, seatsQty } = object;
  return { id, model, year, color, status, buyValue, doorsQty, seatsQty };
};

const motorcycle = (object: IMotorcycle | any) => {
  const { _id: id, model, year, color, status, buyValue, category, engineCapacity } = object;
  return { id, model, year, color, status, buyValue, category, engineCapacity };
};

const convert = (object: any, param: string) => {
  if (param === 'Car') return car(object);
  return motorcycle(object);
};

const convertCar = async (id: string, method: string, body: any, found: any) => {
  let response;
  if (method === 'byId') response = car(found);
  if (method === 'update') {
    const updated = await Car.findByIdAndUpdate(id, { ...body, id }, { new: true }) as ICar;
    response = car(updated);
  }
  return { code: 200, message: response };
};

const convertMotorcycle = async (id: string, method: string, body: any, found: any) => {
  let response;
  if (method === 'byId') response = motorcycle(found);
  if (method === 'update') {
    const updated = await Motorcycle
      .findByIdAndUpdate(id, { ...body, id }, { new: true }) as IMotorcycle;
    response = motorcycle(updated);
  }
  return { code: 200, message: response };
};

const get = async (vehicle:string, id: string, method: string, model: any, body?: ICar) => {
  const retrieved = await model.find();
  const found = retrieved.find((i: any) => i.id === id) as any;
  if (checkId(id, found, vehicle)) return checkId(id, found, vehicle);
  if (vehicle === 'Car') {
    return convertCar(id, method, body, found);
  }
  return convertMotorcycle(id, method, body, found);
};

export { convert, convertCar, convertMotorcycle };
export default { get };