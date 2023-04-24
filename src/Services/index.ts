import { Types } from 'mongoose';

const checkId = (id: any, found: any, vehicle: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return { code: 422, message: { message: 'Invalid mongo id' } };
  }
  if (!found) return { code: 404, message: { message: `${vehicle} not found` } };
  return false;
};
