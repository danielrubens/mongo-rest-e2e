import Vehicle from "../../../src/Domains/Vehicle";
import { IVehicle } from "../../../src/Interfaces";
import { validVehicle } from "../../utils/VehicleMock";

const newMotorcycle: IVehicle = validVehicle
const vehicle: Vehicle = new Vehicle(newMotorcycle)
vehicle.model
vehicle.year
vehicle.color
vehicle.buyValue