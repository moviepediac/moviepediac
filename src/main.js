import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import './mixins'
import '@/scss/style.scss';
import './plugins/quasar'
import './plugins/animate'
import './plugins/hammer'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')