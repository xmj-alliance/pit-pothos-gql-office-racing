import {
  IInputPlayer,
  IPlayer,
} from "src/models/interfaces/player.interface.ts";
import { MockCRUDService } from "./mockCrud.service.ts";

export class PlayerService extends MockCRUDService<IPlayer> {
  add(newItems: IInputPlayer[]) {
    const addingItems: IPlayer[] = [];

    for (const item of newItems) {
      const randomID = crypto.randomUUID();
      const addingItem: IPlayer = {
        id: randomID,
        name: item.name || `random-${randomID}`,
        description: item.description || `random-${randomID}`,
      };
      addingItems.push(addingItem);
    }

    super.add(addingItems);

    return addingItems;
  }

  search(query: string) {
    return super.search(
      query,
      ["id", "name", "description"],
    );
  }

  update(changedItems: IInputPlayer[]) {
    const updatingItems = changedItems as IPlayer[];
    return super.update(updatingItems);
  }
}
