import { createApp } from 'vue';
import store from "./store/index.js";
import App from "./App.vue";
import router from './routers.js';
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import SeatButton from "./components/ui/SeatButton.vue";
import SeatCard from "./components/ui/SeatCard.vue";



const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('seat-button', SeatButton);
app.component('seat-card', SeatCard);

app.mount('#app');
