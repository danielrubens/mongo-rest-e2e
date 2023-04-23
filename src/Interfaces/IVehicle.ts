interface IVehicle {
  _id?: string;  
  id?: string | undefined;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
}
    
export default IVehicle;