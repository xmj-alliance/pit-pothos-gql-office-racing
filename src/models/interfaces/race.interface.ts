import { IBaseObject } from "./base.interface.ts";

export interface IRace extends IBaseObject {
  date: Date;
  scene: string;
  /** IPlayer => IVehicle */
  racerMap: Map<string, string>;
}

export interface IInputRace {
  id?: string | null;
  date?: Date | null;
  scene: string;
  /** IPlayer ID => IVehicle ID */
  racerMap: {
    [playerID: string]: string;
  };
}
