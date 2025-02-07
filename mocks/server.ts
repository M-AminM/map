import { createServer, Model } from "miragejs";
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

      this.get("/search/get-address", (schema: any, request) => {
        let { lat, lng } = request.queryParams;

        // Optionally convert the values to numbers
        const latNum = Number(lat);
        const lngNum = Number(lng);

        // Return a mocked address response based on the coordinates
        return {
          data: schema.addresses.first().attrs,
          latNum,
          lngNum,
        };
      });

      //   this.get("/search/get-address", (schema: any) => {
      //     return schema.addresses.first().attrs;
      //   });
    },
  });
}
