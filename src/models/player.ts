import { IPlayer } from "./interfaces/player.interface.ts";

export class Player implements IPlayer {
  [key: string]: unknown
  name: string;
  description: string;
  id: string;
  /** */
  constructor(_player: IPlayer) {
    this.id = _player.id;
    this.name = _player.name;
    this.description = _player.description;
  }
}
