import {
  Kind,
  ObjectValueNode,
  ValueNode,
} from "https://cdn.skypack.dev/graphql?dts";

export function identity<T>(value: T): T {
  return value;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function ensureObject(value: any): object {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(
      `JSONObject cannot represent non-object value: ${value}`,
    );
  }

  return value;
}

export function parseObject(ast: ObjectValueNode, variables: any): any {
  const value = Object.create(null);
  ast.fields.forEach((field) => {
    // eslint-disable-next-line no-use-before-define
    value[field.name.value] = parseLiteral(field.value, variables);
  });

  return value;
}

export function parseLiteral(ast: ValueNode, variables: any): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      return parseObject(ast, variables);
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(n, variables));
    case Kind.NULL:
      return null;
    case Kind.VARIABLE: {
      const name = ast.name.value;
      return variables ? variables[name] : undefined;
    }
  }
}
