import { IInputVehicle } from "./interfaces/vehicle.interface.ts";

export class InputVehicle implements IInputVehicle {
  /**
   * Needs the ID to update
   */
  id?: string | null;
  name?: string | null;
  description?: string | null;
  /** */
  constructor(_vehicle: IInputVehicle) {
    this.id = _vehicle.id;
    this.name = _vehicle.name;
    this.description = _vehicle.description;
  }
}
