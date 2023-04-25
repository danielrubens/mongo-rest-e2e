import { IMotorcycle } from "../../../src/Interfaces";
import Motorcycle from "../../../src/Domains/Motorcycle";
import { validMotorcycle } from "../../utils/MotorcyclesMock";

const newMotorcycle: IMotorcycle = validMotorcycle;
const motorcycle: Motorcycle = new Motorcycle(newMotorcycle)
motorcycle.model;
motorcycle.year;
motorcycle.color;
motorcycle.buyValue;