import { IMotorcycle } from "../../src/Interfaces";

export const validMotorcycle: IMotorcycle = {
    model: 'Honda CG Titan 125',
    year: 2023, 
    color: 'Blue', 
    buyValue: 1200,
    category: 'Street',
    engineCapacity: 125
  };
  
  export const validMotorcycleWithStatus: IMotorcycle = {
    model: 'Honda CG Titan 125',
    year: 1983,
    color: 'Red',
    status: false, 
    buyValue: 1000,
    category: 'Street',
    engineCapacity: 125
  };
  
  export const updatedMotorcycle: IMotorcycle = {
    model: 'Yamaha R6', 
    year: 2022, 
    color: 'Red',
    status: true,
    buyValue: 9.500, 
    category: 'Sport', 
    engineCapacity: 600 
  };
  
  
  export const motorcyclesArray: IMotorcycle[] =[
    {
      id: '634852326b35b59438fbea2f',
      model: 'Kawasaki Ninja ZX-6R', 
      year: 2019,
      color: 'Green',
      status: true,
      buyValue: 28.000, 
      category: 'Sport',
      engineCapacity: 600
    },
    {
      id: '634852326b35b59438fbea31',
      model: 'Suzuki GSX-R1000', 
      year: 2020,
      color: 'Blue',
      status: false, 
      buyValue: 54.000, 
      category: 'Sport',
      engineCapacity: 1000
    }
  ]
  