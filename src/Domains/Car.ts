import IVehicle from '../Interfaces/IVehicle';

class Car implements IVehicle {
  constructor(
    public model: string, 
    public year: number, 
    public color: string, 
    public buyValue: number, 
    public id?: string, 
    public status?: boolean,
  ) {}
  
  getId() { return this.id; }
  
  getStatus() { return this.status; }
  
  getBuyValue() { return this.buyValue; }
  
  getColor() { return this.color; }
  
  getModel() { return this.model; }
  
  getYear() { return this.year; }
}
  
export default Car;