This field test brings [Pothos GraphQL tool][Pothos] with [oak framework][oak].

## Dependencies

```jsonc
{
  "@contrawork/graphql-helix/": "https://cdn.jsdelivr.net/gh/contrawork/graphql-helix@master/packages/deno/",
  "@hayes/pothos": "https://cdn.jsdelivr.net/gh/hayes/giraphql/packages/deno/packages/core/mod.ts",
  "oak": "https://deno.land/x/oak@v10.5.1/mod.ts",

  "https://cdn.skypack.dev/graphql@16.0.0-experimental-stream-defer.5?dts": "https://cdn.skypack.dev/graphql@v16.2.0?dts",
  "https://cdn.skypack.dev/graphql?dts": "https://cdn.skypack.dev/graphql@v16.2.0?dts"
}
```

## Running the app

- Run with docker-compose.

  Create a bridge network: `docker network create main`, then create your
  docker-compose.yaml from this [example file](./docker-compose.run.yaml) and
  run with `docker-compose up -d`.

- (OR) Run with docker.

  Create a bridge network `docker network create main`, then run:

  ```shell
  docker run -d \
  --name pothos-gql-office-racing-c1 \
  --network main \
  -p 13000:3000 \
  --user 1000 \
  ghcr.io/valorad/pothos-gql-office-racing:latest
  ```

- (OR) (Not recommended) Entirely manually. You need to first install deno from
  [denoland][denoland], then clone this field test and run:

  ```shell
  deno run --allow-net --import-map=deps.json src/app.ts
  ```

  Note: This is very likely to break, as the latest dependant libraries are
  fetched through network in real time, which is unstable.

## Testing GraphQL Endpoints

Import the [API definition file][insomniaAPIFile] into
[Insomnia client][insomniaClient] and start testing.

## Introduction

This field test demonstrates one approach to building a GraphQL "middle-end"
server in deno. It sets up CRUD services and controllers on top of
[oak framework][oak], accesses an imaginary data source and builds up
GraphQLendpoints with [Pothos GraphQL tool][Pothos].

## Data model

The model used here is about office racing management. It has `Player`,
`Vehicle` and `Race`. The class diagram is shown as follows.

![dataModel](https://i.imgur.com/Dhd5grm.jpg)

https://online.visual-paradigm.com/community/share/pothos-gql-office-racing-x2jv4lc2j

Models are defined within `src/models`. The field test has also included the
GraphQL scalars extracted from `Urigo/graphql-scalars`.

## Model vs InputModel

GraphQL has object data type used in Query, with input type used in Mutation.

Therefore, in this field test, the object type class and input type class are
created separately.

They are different. Even if the fields are the same (e.g. Player class), their
representations are not: input ID and some fields can be empty.

## Services

CRUD services for the field test are provided under `src/services`.

They are easily scalable for new models.

Each service for a model inherits from the base `MockCrudService` class, yet the
manner of search, insert, and update of individuals should be defined properly.

## Controllers

`APIController` opens `/api` route, which intends to show metadata and serve as
a readiness endpoint used by container health check systems.

`GraphController` is the main GraphQL endpoint `/gql`. It serves as a
minimalistic working GraphQL server that integrates into `oak` routing system.

## Graph Building

Because deno is a relatively new environment, the ecosystem is not complete.
`Pothos` is working in a way of creating a single monolithic GraphQL schema,
which is hard to scale as the number of business models increases. Also,
currently, there are no libraries to help merge GraphQL schema after `Pothos`
builds.

Thus, this field test uses a hacky practice to meet scalability needs. It
separates models in the build process: creating builders for each model, where
object and input types that are only specific to that model are defined. The
builders are imported to the main Graph controller so that query and mutation
resolvers can be individually built, and be "merged" during the schema build
process.

`SchemaBuilder.ts`: utility to create the schema, making sure only 1 schema
builder instance is present.

`xxx.builder.ts`: Schema builder for each model. Defines gql object and input
type, and builds query and mutation resolvers to be merged in the gql
controller.

## Further development

Update lock file

```shell
deno cache --import-map=deps.json --unstable --lock=lock.json --lock-write --reload src/app.ts
```

## Testings

```shell
deno test --import-map=./deps.json ./src/tests
```

## Side note

Notes about denoland library 404: https://github.com/hayes/pothos/issues/259

<!-- Refs -->

[denoland]: https://deno.land/#installation
[Pothos]: https://pothos-graphql.dev/
[oak]: https://oakserver.github.io/oak/
[insomniaAPIFile]: docs/api-insomnia.json
[insomniaClient]: https://insomnia.rest/
