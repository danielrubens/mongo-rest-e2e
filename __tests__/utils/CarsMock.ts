import ICar from '../../src/Interfaces/ICar';

export const validCar: ICar = {
  model: 'New Car',
  year: 2022,
  color: 'Green',
  buyValue: 10000,
  doorsQty: 4,
  seatsQty: 5,
};

export const validCarWithStatus: ICar = {
  model: 'New Car',
  year: 2022,
  color: 'Green',
  status: false,
  buyValue: 10000,
  doorsQty: 4,
  seatsQty: 5,
};

export const updatedCar: ICar = {
  model: 'New Car',
  year: 2022,
  color: 'Green',
  status: false,
  buyValue: 10000,
  doorsQty: 4,
  seatsQty: 5,
};

export const carsArray: ICar[] = [
  {
    model: 'New Car',
    year: 2022,
    color: 'Green',
    status: false,
    buyValue: 10000,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    model: 'Another New Car',
    year: 2023,
    color: 'Blue',
    status: true,
    buyValue: 20000,
    doorsQty: 2,
    seatsQty: 4,
  },
];
