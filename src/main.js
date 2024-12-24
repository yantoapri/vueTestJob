import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { createBootstrap } from "bootstrap-vue-next";
import VueSweetalert2 from "vue-sweetalert2";

// Add the necessary CSS
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDashboard,
  faUser,
  faPlus,
  faTrash,
  faPencil,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([
  faDashboard,
  faUser,
  faPlus,
  faTrash,
  faPencil,
  faEye,
  faEyeSlash,
]);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createBootstrap());
app.use(VueSweetalert2);
app.use(createPinia());
app.use(router);

app.mount("#app");
