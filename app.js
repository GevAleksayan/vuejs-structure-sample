import Vue from 'vue';
import store from './vuex';
import SafePassApp from './components/SafePassApp';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './plugins/fontawesome';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import VueMoment from 'vue-moment';
Vue.use(VueMoment);

import VueQrcodeReader from "vue-qrcode-reader";
Vue.use(VueQrcodeReader);

import axios from 'axios';
Vue.prototype.$axios = axios;

import _ from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: _ });

import router from './router';
import i18n from './plugins/vue-i18n';

new Vue({
    render: h => h(SafePassApp),
    store,
    router,
    i18n,
}).$mount('#safe-pass-app');
