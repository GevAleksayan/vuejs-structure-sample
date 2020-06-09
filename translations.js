export default {
    en: {
        CovidTestResult: {
            privacyMsg: `<p class="mb-2">SafePass protects your health, privacy, and enables anonymous rules-based communications.</p>
                         <p class="mb-2">All your responses are kept confidential. SafePass 
                            <span class="font-weight-bold">never shares your personal information with anyone.</span>
                         </p>`,
            covidTestQuestion: 'Has anyone in your household tested positive for Covid-19?',
            positive: 'Yes',
            negative: 'No',
            startDatePlaceholder: 'Date symptoms began',
            recoveredDatePlaceholder: 'Date recovered',
            validationErrorMsg: 'Please select dates',
            actionButtonTitle: 'continue',
        },
        DailyQuestions: {
            pageTitle: {
                user: 'Daily Questions',
                household: 'Household',
            },
            userSymptomsQuestion: `<p class="mb-2">Have you experienced any of the following symptoms in the last 24 hours:</p>`,
            householdSymptomsQuestion: `<p class="mb-2">
                                            <span class="font-weight-bold">Has anyone in your household</span>
                                            experienced any of the following symptoms in the last 24 hours:
                                        </p>`,
            actionButtonTitle: 'continue',
        },
        Temperature: {
            pageTitle: 'Temperature',
            temperatureInputLabel: 'Select your temperature for today',
            temperatureInputPlaceholder: 'Select temperature (F)',
            fileInputLabel: 'Upload a picture of your temperature reading today',
            validationErrorMsg: 'Please Enter your temperature for today',
            actionButtonTitle: {
                uploadPhoto: 'upload photo',
                submit: 'submit',
            },
        },
        QRCode: {
            pageMsg: 'You’re at low risk and good to go!',
        },
        AtRisk: {
            pageMsg: `<p class="mb-3">Based on your answers you are at risk for coronavirus.</p>
                      <p>For your protection the governor requires you to stay away from work and follow CDC guidelines to care for yourself:</p>`,
            actionButtonTitle: 'View CDC guidelines',
        },
    },
    es: {
        CovidTestResult: {
            privacyMsg: `<p class="mb-2">SafePass protege su salud, privacidad y permite comunicaciones anónimas basadas en reglas.</p>
                         <p class="mb-2">Todas sus respuestas se mantienen confidenciales. SafePass 
                             <span class="font-weight-bold">nunca comparte su información personal con nadie.</span>
                         </p>`,
            covidTestQuestion: 'Alguien en su hogar dio positivo por Covid-19?',
            positive: 'Si',
            negative: 'No',
            startDatePlaceholder: 'Fecha síntomas bega',
            recoveredDatePlaceholder: 'Fecha de recuperación',
            validationErrorMsg: 'Por favor seleccione fechas',
            actionButtonTitle: 'seguir',
        },
        DailyQuestions: {
            pageTitle: {
                user: 'Preguntas Diarias',
                household: 'Casa',
            },
            userSymptomsQuestion: `<p class="mb-2">Ha experimentado alguno de los siguientes síntomas en las últimas 24 horas:</p>`,
            householdSymptomsQuestion: `<p class="mb-2">
                                            <span class="font-weight-bold">Alguien en su hogar</span>
                                            ha experimentado alguno de los siguientes síntomas en las últimas 24 horas:
                                        </p>`,
            actionButtonTitle: 'seguir',
        },
        Temperature: {
            pageTitle: 'Temperatura',
            temperatureInputLabel: 'Seleccione su temperatura para hoy',
            temperatureInputPlaceholder: 'Seleccionar temperatura (F)',
            fileInputLabel: 'Sube una foto de tu temperatura leyendo hoy',
            validationErrorMsg: 'Por favor, introduzca su temperatura para hoy',
            actionButtonTitle: {
                uploadPhoto: 'subir foto',
                submit: 'enviar',
            },
        },
        QRCode: {
            pageMsg: 'Tienes poco riesgo y listo!',
        },
        AtRisk: {
            pageMsg: `<p class="mb-3">Según sus respuestas, corre el riesgo de tener coronavirus.</p>
                      <p>Para su protección, el gobernador requiere que se mantenga alejado del trabajo y siga las pautas de los CDC para cuidarse:</p>`,
            actionButtonTitle: 'Ver las pautas de los CDC',
        },
    },
}