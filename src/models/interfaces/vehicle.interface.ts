import { IBaseObject } from "./base.interface.ts";

export interface IVehicle extends IBaseObject {
  name: string;
  description: string;
}

export interface IInputVehicle {
  id?: string | null;
  name?: string | null;
  description?: string | null;
}
