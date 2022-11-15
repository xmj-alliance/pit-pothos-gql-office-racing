import SchemaBuilder from "@hayes/pothos";
import { GraphQLJSONObject } from "src/models/scalars/json/JSONObject.ts";
import { GraphQLDate } from "src/models/scalars/iso-date/Date.ts";

interface AppliedScalar {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    JSONObject: {
      Input: any;
      Output: any;
    };
  };
}

export const createSchemaBuilder = () => {
  const builder = new SchemaBuilder<AppliedScalar>({});
  builder.addScalarType("JSONObject", GraphQLJSONObject, {});
  builder.addScalarType("Date", GraphQLDate, {});
  return builder;
};

export type PothosSchemaBuilder = PothosSchemaTypes.SchemaBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<AppliedScalar>
>;

export type PothosQueryBuilder = PothosSchemaTypes.QueryFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<AppliedScalar>,
  {}
>;

export type PothosMutationBuilder = PothosSchemaTypes.MutationFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<AppliedScalar>,
  {}
>;
