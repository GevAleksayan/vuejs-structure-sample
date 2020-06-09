export const getters = {
    user: state => state.user,
    QRCode: state => state.QRCode,
    testResult: state => state.testResult,
    dailyQuestions: state => state.dailyQuestions,
    userDailySymptoms: state => state.userDailySymptoms,
    householdDailySymptoms: state => state.householdDailySymptoms,
    temperatureObj: state => state.temperatureObj,
    userSymptomsWeight: state => state.userDailySymptoms.reduce((sum, item) => {return sum + item.weight}, 0),
    householdSymptomsWeight: state => state.householdDailySymptoms.reduce((sum, item) => {return sum + item.weight}, 0),
};