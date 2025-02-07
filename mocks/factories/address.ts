import { Factory } from "miragejs";

export default {
  address: Factory.extend({
    address() {
      return ["tehran", "tajrish"];
    },
  }),
};
