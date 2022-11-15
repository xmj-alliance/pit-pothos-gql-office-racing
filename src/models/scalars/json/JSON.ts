import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "https://cdn.skypack.dev/graphql?dts";
import { identity, parseLiteral } from "./utils.ts";

const specifiedByURL =
  "http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf";

export const GraphQLJSONConfig = /*#__PURE__*/ {
  name: "JSON",
  description:
    "The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).",
  serialize: identity,
  parseValue: identity,
  parseLiteral,
  specifiedByURL,
  specifiedByUrl: specifiedByURL,
  extensions: {
    codegenScalarType: "any",
  },
} as GraphQLScalarTypeConfig<any, any>;

export const GraphQLJSON: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType(GraphQLJSONConfig);
