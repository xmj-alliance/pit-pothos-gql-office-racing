FROM denoland/deno:alpine-1.21.0

ARG BASE_DIR=/workspace/www/pothos-gql-office-racing

WORKDIR ${BASE_DIR}/

# Caching deno modules
COPY ./src ./src
COPY ./deps.json ./lock.json ./
RUN deno cache --import-map=deps.json --unstable --lock=lock.json src/app.ts \
&& rm lock.json

# Switch to non-root user
RUN chown -R deno:deno ${BASE_DIR}/ \
&& chown -R deno:deno /deno-dir
USER deno

EXPOSE 3000

# Run app
CMD [ \
  "run", \
  "--allow-net", \
  "--import-map=/workspace/www/pothos-gql-office-racing/deps.json", \
  "/workspace/www/pothos-gql-office-racing/src/app.ts" \
]
