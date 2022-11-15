import { IInputPlayer } from "./interfaces/player.interface.ts";

export class InputPlayer implements IInputPlayer {
  /**
   * Needs the ID to update
   */
  id?: string | null;
  name?: string | null;
  description?: string | null;
  /** */
  constructor(_player: IInputPlayer) {
    this.id = _player.id;
    this.name = _player.name;
    this.description = _player.description;
  }
}
