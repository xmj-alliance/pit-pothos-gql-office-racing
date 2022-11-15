import { IRace } from "./interfaces/race.interface.ts";

export class Race implements IRace {
  [key: string]: unknown
  id: string;
  date: Date;
  scene: string;
  /** IPlayer => IVehicle */
  racerMap: Map<string, string>;

  /** */
  constructor(_race: IRace) {
    this.id = _race.id;
    this.date = _race.date;
    this.scene = _race.scene;
    this.racerMap = _race.racerMap;
  }
}
