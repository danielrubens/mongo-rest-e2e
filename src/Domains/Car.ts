import ICar from '../Interfaces/ICar';

class Car {
  public id: string | undefined;
  protected model: string;
  public year: number;
  public color: string;
  public buyValue: number;
  public status: boolean | undefined;

  constructor({ id, model, year, color, status, buyValue }: ICar) {
    this.id = id;
    this.buyValue = buyValue;
    this.color = color;
    this.model = model;
    this.year = year;
    this.status = status;
  }
  
  public getId() {
    return this.id;
  }
  
  public getStatus() {
    return this.status;
  }
  
  public getBuyValue() {
    return this.buyValue;
  }
  
  public getColor() {
    return this.color;
  }
  public getModel() {
    return this.model;
  }

  public getYear() {
    return this.year;
  }
}

export default Car;