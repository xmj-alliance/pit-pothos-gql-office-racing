import { IVehicle } from "./interfaces/vehicle.interface.ts";

export class Vehicle implements IVehicle {
  [key: string]: unknown
  id: string;
  name: string;
  description: string;

  /** */
  constructor(_vehicle: IVehicle) {
    this.id = _vehicle.id;
    this.name = _vehicle.name;
    this.description = _vehicle.description;
  }
}
