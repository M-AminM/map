import { Factory } from "miragejs";

export default {
  search: Factory.extend({
    search() {
      return ["tehran", "tajrish"];
    },
  }),
};
