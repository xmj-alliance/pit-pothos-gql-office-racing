import { InputObjectRef } from "@hayes/pothos";

import { Vehicle } from "src/models/vehicle.ts";
import { InputVehicle } from "src/models/inputVehicle.ts";
import { VehicleService } from "src/services/vehicle.service.ts";
import {
  PothosMutationBuilder,
  PothosQueryBuilder,
  PothosSchemaBuilder,
} from "./schemaBuilder.ts";

export class VehicleGraphBuilder {
  private readonly vehicleService = new VehicleService();
  private readonly builder: PothosSchemaBuilder;

  private inputType: InputObjectRef<InputVehicle>;

  /** */
  constructor(
    _builder: PothosSchemaBuilder,
  ) {
    this.builder = _builder;
    this.applyVehicleObjectType();
    this.inputType = this.createVehicleInputType();
  }

  private applyVehicleObjectType = () => {
    return this.builder.objectType(Vehicle, {
      name: "Vehicle",
      description: "vehicle graph descr",
      fields: (t) => ({
        id: t.exposeID("id" as never),
        name: t.exposeString("name" as never),
        description: t.exposeString("description" as never),
      }),
    });
  };

  private createVehicleInputType = () => {
    const inputRef = this.builder.inputRef<InputVehicle>("InputVehicle");

    return this.builder.inputType(inputRef, {
      description: "vehicle graph descr",
      fields: (t) => ({
        id: t.string(),
        name: t.string(),
        description: t.string(),
      }),
    });
  };

  buildQueryType = (t: PothosQueryBuilder) => {
    return {
      getVehicles: t.field({
        type: [Vehicle],
        args: {
          ids: t.arg.stringList({ required: true }),
        },
        resolve: (parent, args) => this.vehicleService.getByIDs(args.ids),
      }),

      searchVehicles: t.field({
        type: [Vehicle],
        args: {
          query: t.arg.string({ required: true }),
        },
        resolve: (parent, args) => this.vehicleService.search(args.query),
      }),
    };
  };

  buildMutationType = (t: PothosMutationBuilder) => {
    return {
      addVehicles: t.field({
        type: [Vehicle],
        args: {
          newItems: t.arg({ type: [this.inputType], required: true }),
        },
        resolve: (parent, args) => this.vehicleService.add(args.newItems),
      }),

      updateVehicles: t.field({
        type: [Vehicle],
        args: {
          changedItems: t.arg({ type: [this.inputType], required: true }),
        },
        resolve: (parent, args) =>
          this.vehicleService.update(args.changedItems),
      }),

      deleteVehicles: t.field({
        type: [Vehicle],
        args: {
          searchIDs: t.arg.stringList({ required: true }),
        },
        resolve: (parent, args) =>
          this.vehicleService.deleteByIDs(args.searchIDs),
      }),
    };
  };
}
