import { createServer, Factory, Model } from "miragejs";
import addressFactory from "./factories/search";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    factories: {
      ...addressFactory,
    },

    models: {
      address: Model,
    },

    seeds(server) {
      server.create("address");
    },

    routes() {
      this.namespace = "api";

      this.get("/addresses", (schema: any) => {
        return schema.addresses.first().attrs;
      });
    },
  });
}
