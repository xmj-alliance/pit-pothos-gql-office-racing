import { Router } from "oak";
import { getGraphQLParameters } from "@contrawork/graphql-helix/get-graphql-parameters.ts";
import { processRequest } from "@contrawork/graphql-helix/process-request.ts";

import { createSchemaBuilder } from "./graphs/schemaBuilder.ts";
import { PlayerGraphBuilder } from "./graphs/player.builder.ts";
import { VehicleGraphBuilder } from "./graphs/vehicle.builder.ts";
import { RaceGraphBuilder } from "./graphs/race.builder.ts";

export class GraphController {
  private _router = new Router();
  public get router(): Router {
    return this._router;
  }

  /** */
  constructor() {
    const builder = createSchemaBuilder();

    const playerGraphBuilder = new PlayerGraphBuilder(builder);
    const vehicleGraphBuilder = new VehicleGraphBuilder(builder);
    const raceGraphBuilder = new RaceGraphBuilder(builder);

    builder.queryType({
      fields: (t) => ({
        ...(playerGraphBuilder.buildQueryType(t)),
        ...(vehicleGraphBuilder.buildQueryType(t)),
        ...(raceGraphBuilder.buildQueryType(t)),
      }),
    });

    builder.mutationType({
      fields: (t) => ({
        ...(playerGraphBuilder.buildMutationType(t)),
        ...(vehicleGraphBuilder.buildMutationType(t)),
        ...(raceGraphBuilder.buildMutationType(t)),
      }),
    });

    const schema = builder.toSchema({});

    this.router.all("/", async (context) => {
      // parse request
      const request = {
        body: await context.request.body({}).value,
        headers: context.request.headers,
        method: context.request.method,
        query: context.request.url.searchParams,
      };

      // Extract the GraphQL parameters from the request
      const { operationName, query, variables } = getGraphQLParameters(request);

      // Validate and execute the query
      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
      });

      if (result.type === "RESPONSE") {
        // We set the provided status and headers and just the send the payload back to the client
        result.headers.forEach(({ name, value }) =>
          context.response.headers.set(name, value)
        );

        context.response.status = result.status;
        context.response.body = result.payload;
      } else {
        // Omitting other response types for brevity, see graphql-helix docs for more a complete implementation
        throw new Error("Unsupported result type");
      }
    });
  }
}
