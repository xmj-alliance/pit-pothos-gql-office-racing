import { InputObjectRef } from "@hayes/pothos";

import { Race } from "src/models/race.ts";
import { InputRace } from "src/models/inputRace.ts";
import { RaceService } from "src/services/race.service.ts";
import {
  PothosMutationBuilder,
  PothosQueryBuilder,
  PothosSchemaBuilder,
} from "./schemaBuilder.ts";

export class RaceGraphBuilder {
  private readonly raceService = new RaceService();
  private readonly builder: PothosSchemaBuilder;

  private inputType: InputObjectRef<InputRace>;

  /** */
  constructor(
    _builder: PothosSchemaBuilder,
  ) {
    this.builder = _builder;
    this.applyRaceObjectType();
    this.inputType = this.createRaceInputType();
  }

  private applyRaceObjectType = () => {
    return this.builder.objectType(Race, {
      name: "Race",
      description: "race graph descr",
      fields: (t) => ({
        id: t.exposeID("id" as never),
        date: t.field({
          type: "Date",
          resolve: (race) => race.date,
        }),
        scene: t.exposeString("scene" as never),
        /** Type: {[playerID: string]: string}; IPlayer ID => IVehicle ID */
        racerMap: t.field({
          type: "JSONObject",
          resolve: (race) => Object.fromEntries(race.racerMap) as any,
        }),
      }),
    });
  };

  private createRaceInputType = () => {
    const inputRef = this.builder.inputRef<InputRace>("InputRace");

    return this.builder.inputType(inputRef, {
      description: "race graph descr",
      fields: (t) => ({
        id: t.string(),
        date: t.field({
          type: "Date",
        }),
        scene: t.string({ required: true }),
        /** Type: {[playerID: string]: string}; IPlayer ID => IVehicle ID */
        racerMap: t.field({
          type: "JSONObject",
          required: true,
        }),
      }),
    });
  };

  buildQueryType = (t: PothosQueryBuilder) => {
    return {
      getRaces: t.field({
        type: [Race],
        args: {
          ids: t.arg.stringList({ required: true }),
        },
        resolve: (parent, args) => this.raceService.getByIDs(args.ids),
      }),

      searchRaces: t.field({
        type: [Race],
        args: {
          query: t.arg.string({ required: true }),
        },
        resolve: (parent, args) => this.raceService.search(args.query),
      }),
    };
  };

  buildMutationType = (t: PothosMutationBuilder) => {
    return {
      addRaces: t.field({
        type: [Race],
        args: {
          newItems: t.arg({ type: [this.inputType], required: true }),
        },
        resolve: (parent, args) => this.raceService.addRaces(args.newItems),
      }),

      updateRaces: t.field({
        type: [Race],
        args: {
          changedItems: t.arg({ type: [this.inputType], required: true }),
        },
        resolve: (parent, args) =>
          this.raceService.updateRaces(args.changedItems),
      }),

      deleteRaces: t.field({
        type: [Race],
        args: {
          searchIDs: t.arg.stringList({ required: true }),
        },
        resolve: (parent, args) => this.raceService.deleteByIDs(args.searchIDs),
      }),
    };
  };
}
