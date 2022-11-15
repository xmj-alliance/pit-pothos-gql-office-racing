import { IInputRace, IRace } from "src/models/interfaces/race.interface.ts";
import { MockCRUDService } from "./mockCrud.service.ts";

export class RaceService extends MockCRUDService<IRace> {
  /**
   * @deprecated Use RaceService.addRaces() instead.
   */
  add(newItems: IRace[]): IRace[] {
    throw new Error("Method disabled. Use RaceService.addRaces() instead");
  }

  addRaces(newItems: IInputRace[]) {
    const addingItems: IRace[] = [];

    for (const item of newItems) {
      const randomID = crypto.randomUUID();
      const addingItem: IRace = {
        id: randomID,
        date: item.date || new Date(),
        scene: item.scene,
        racerMap: new Map(Object.entries(item.racerMap)),
      };
      addingItems.push(addingItem);
    }

    super.add(addingItems);

    return addingItems;
  }

  /**
   * @deprecated Use RaceService.updateRaces() instead.
   */
  update(changedItems: IRace[]): IRace[] {
    throw new Error("Method disabled. Use RaceService.updateRaces() instead");
  }

  updateRaces(changedItems: IInputRace[]) {
    const changedRaces: IRace[] = changedItems.map((race) => ({
      id: race.id as string,
      date: race.date || new Date(),
      scene: race.scene,
      racerMap: new Map(Object.entries(race.racerMap)),
    }));

    return super.update(changedRaces);
  }

  search(query: string) {
    return super.search(
      query,
      ["id", "scene"],
    );
  }
}
