import {
  IInputVehicle,
  IVehicle,
} from "src/models/interfaces/vehicle.interface.ts";
import { MockCRUDService } from "./mockCrud.service.ts";

export class VehicleService extends MockCRUDService<IVehicle> {
  add(newItems: IInputVehicle[]) {
    const addingItems: IVehicle[] = [];

    for (const item of newItems) {
      const randomID = crypto.randomUUID();
      const addingItem: IVehicle = {
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

  update(changedItems: IInputVehicle[]) {
    const updatingItems = changedItems as IVehicle[];
    return super.update(updatingItems);
  }
}
