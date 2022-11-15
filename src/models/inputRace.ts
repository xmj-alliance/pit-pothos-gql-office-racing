import { IInputRace } from "./interfaces/race.interface.ts";

export class InputRace implements IInputRace {
  /**
   * Needs the ID to update
   */
  id?: string | null;
  date?: Date | null;
  scene: string;
  /** IPlayer ID => IVehicle ID */
  racerMap: {
    [playerID: string]: string;
  };
  /** */
  constructor(_race: IInputRace) {
    this.id = _race.id;
    this.date = _race.date;
    this.scene = _race.scene;
    this.racerMap = _race.racerMap;
  }
}
