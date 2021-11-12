import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);
app
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
      libraries: "places",
    },
  })
  .mount("#app");
