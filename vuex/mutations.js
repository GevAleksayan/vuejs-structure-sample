import Vue from 'vue';

export const mutations = {
    setDailyQuestions(state, dailyQuestions) {
        Vue.set(state, 'dailyQuestions', _.clone(dailyQuestions));
    },
    setUserDailySymptoms(state, dailySymptoms) {
        Vue.set(state, 'userDailySymptoms', _.clone(dailySymptoms));
    },
    setHouseholdDailySymptoms(state, dailySymptoms) {
        Vue.set(state, 'householdDailySymptoms', _.clone(dailySymptoms));
    },
    setTemperatureObj(state, temperatureObj) {
        Vue.set(state, 'temperatureObj', _.clone(temperatureObj));
    },
    setTestResult(state, testResult) {
        Vue.set(state, 'testResult', _.clone(testResult));
    },
    setQRCode(state, qrCode) {
        Vue.set(state, 'QRCode', _.clone(qrCode));
    }
};