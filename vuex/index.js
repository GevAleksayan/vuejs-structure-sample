import Vue from 'vue';
import Vuex from 'vuex';
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'

const state = {
    user: {
        id: 1,
    },
    testResult: {},
    dailyQuestions: [],
    userDailySymptoms: [],
    householdDailySymptoms: [],
    temperatureObj: {},
    QRCode: {},
};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});