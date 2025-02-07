import { createServer, Model } from "miragejs";
import addressFactory from "./factories/address";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    factories: {
      ...addressFactory,
    },

    models: {
      address: Model,
      search: Model,
    },

    seeds(server: any) {
      server.create("address");

      server.create("search", {
        name: "تجریش",
        lat: 35.80451872215149,
        lng: 51.428289413452156,
      });
      server.create("search", {
        name: "ونک",
        lat: 35.75770077253569,
        lng: 51.40994310379029,
      });
      server.create("search", {
        name: "سید خندان",
        lat: 35.74811444693245,
        lng: 51.442880630493164,
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/search/get-address", (schema: any, request) => {
        let { lat, lng } = request.queryParams;

        const latNum = Number(lat);
        const lngNum = Number(lng);

        return {
          data: schema.addresses.first().attrs,
          latNum,
          lngNum,
        };
      });

      this.get("/search/search-address", (schema: any, request) => {
        let { address }: any = request.queryParams;

        if (address) {
          return schema.searches.where((search: any) => {
            return search.name.toLowerCase().includes(address.toLowerCase());
          });
        }
        return schema.searches.all();
      });
    },
  });
}
