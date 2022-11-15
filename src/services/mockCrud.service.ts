import { IBaseObject } from "../models/interfaces/base.interface.ts";

export class MockCRUDService<T extends IBaseObject> {
  private items: T[] = [];

  add(newItems: T[]) {
    const addingItems: T[] = [];
    this.items = this.items.concat(newItems);
    return addingItems;
  }

  getByIDs = (searchIDs: string[]) => {
    return this.items.filter((ele) => searchIDs.includes(ele.id));
  };

  getAll = () => {
    return this.items;
  };

  search(query: string, fields: string[]) {
    if (this.items.length <= 0) {
      return [] as T[];
    }

    // do a whole search

    const resultCollection: T[][] = [];

    for (const field of fields) {
      const filterResult = this.items.filter(
        (ele) => {
          const itemField = ele[field];
          if (!(typeof itemField === "string" || itemField instanceof String)) {
            return false;
          }
          return itemField.includes(query);
        },
      );

      resultCollection.push(filterResult);
    }

    // remove duplicate IDs
    const itemMap: { [id: string]: T } = {};

    for (const fieldResults of resultCollection) {
      for (const item of fieldResults) {
        if (!itemMap[item.id]) {
          itemMap[item.id] = item;
        }
      }
    }

    return Object.values(itemMap);
  }

  update(changedItems: T[]) {
    const updatedItems: T[] = [];

    for (const item of changedItems) {
      const existingItemIndex = this.items.findIndex((ele) =>
        ele.id === item.id
      );
      if (existingItemIndex < 0) {
        continue;
      }

      this.items.splice(existingItemIndex, 1, item);

      updatedItems.push(item);
    }

    return updatedItems;
  }

  deleteByIDs = (searchIDs: string[]) => {
    let deletedItems: T[] = [];

    for (const id of searchIDs) {
      const existingItemIndex = this.items.findIndex((ele) => ele.id === id);
      if (existingItemIndex < 0) {
        continue;
      }
      const deletingItems = this.items.splice(existingItemIndex, 1);
      deletedItems = deletedItems.concat(deletingItems);
    }

    return deletedItems;
  };
}
