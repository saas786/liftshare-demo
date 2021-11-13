import { createApp } from "vue";
import App from "./App.vue";
import { makeServer } from "./server";
import "./index.css";

import VueGoogleMaps from "@fawmi/vue-google-maps";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const app = createApp(App);
app
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
      libraries: "places",
    },
  })
  .mount("#app");
