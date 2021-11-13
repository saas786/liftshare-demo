import { Server, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api";

      this.post(
        "/journey",
        (schema, request) => {
          const headers = {};
          const journey = JSON.parse(request.requestBody);
          return new Response(200, headers, {
            message: `Successfully saved planet by sharing journey: ${JSON.stringify(
              journey
            )}`,
          });
        },
        { timing: 2500 }
      );
    },
  });

  return server;
}
