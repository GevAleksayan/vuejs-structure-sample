import Vue from 'vue';
import VueRouter from 'vue-router';

import CovidTestResult from "./pages/CovidTestResult";
import DailyQuestions from "./pages/DailyQuestions";
import Temperature from "./pages/Temperature";
import QRCode from "./pages/QRCode";
import AtRisk from "./pages/AtRisk";

import ScanEmployee from "./pages/foreman/ScanEmployee";
import Result from "./pages/foreman/Result";
import Map from "./pages/foreman/Map";

const routes = [
    { path: '/', component: CovidTestResult},
    { path: '/daily-questions', component: DailyQuestions},
    { path: '/temperature', component: Temperature},
    { path: '/qr-code', component: QRCode},
    { path: '/at-risk', component: AtRisk},
    { path: '/scan', component: ScanEmployee},
    { path: '/result', name: 'result', component: Result, props: true},
    { path: '/map', component: Map},
];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes,
});