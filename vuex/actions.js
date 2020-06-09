import axios from 'axios';
import store from './index';

export const actions = {
    getDailyQuestions(context) {
        // axios.get('/questions').then(response => {
        //     context.commit('setDailyQuestions', response.data.questions);
        // });
        let dailyQuestions = [
            {
                question: 'Feeling feverish',
                weight: 90,
            },
            {
                question: 'Sneezing',
                weight: 90,
            },
            {
                question: 'Coughing',
                weight: 90,
            },
            {
                question: 'Feeling Tired',
                weight: 40,
            },
            {
                question: 'Shortness of Breath',
                weight: 90,
            },
            {
                question: 'Sore Throat',
                weight: 90,
            },
            {
                question: 'Headache',
                weight: 35,
            },
            {
                question: 'Aching Muscles or Joints',
                weight: 55,
            },
        ];
        context.commit('setDailyQuestions', dailyQuestions);
    },
    submitUserDailySymptoms(context, dailySymptoms) {
        context.commit('setUserDailySymptoms', dailySymptoms);
    },
    submitHouseholdDailySymptoms(context, dailySymptoms) {
        context.commit('setHouseholdDailySymptoms', dailySymptoms);
    },
    submitTemperatureForToday(context, temperatureObj) {
        context.commit('setTemperatureObj', temperatureObj)
    },
    submitTestResult(context, testResult) {
        context.commit('setTestResult', testResult);
    },
    generateQRCode(context) {
        axios.post('/api/qr-create', {
            user_id: store.getters['user'].id,
        }).then(response => {
            context.commit('setQRCode', response.data.data.qr_code)
        })
    },
    checkQRCode(context, qr_token) {
        return axios.get('/api/qr-check', { params: {qr_token} });
    }
};