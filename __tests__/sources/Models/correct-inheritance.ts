import { ICar, IMotorcycle, IVehicle } from "../../../src/Interfaces";
import AbstractODM from "../../../src/Models/AbstractODM";

class subOdmTestCar extends AbstractODM<ICar>{}
class subOdmTestVehicle extends AbstractODM<IVehicle>{}
class subOdmTestMotorcycle extends AbstractODM<IMotorcycle>{}