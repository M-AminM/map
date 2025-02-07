import { Factory } from "miragejs";

export default {
  address: Factory.extend({
    addresses() {
      return ["tehran", "tajrish"];
    },
  }),
};
