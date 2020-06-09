<template>
    <base-layout>
        <template v-slot:header>
            <span>SafePass</span>
            <language-switcher/>
        </template>
        <div v-html="$t('CovidTestResult.privacyMsg')"></div>
        <p class="mb-0">{{$t('CovidTestResult.covidTestQuestion')}}</p>
        <div class="mb-3">
            <select v-model="testedPositive" class="covid-input bg-white">
                <option :value="false">{{$t('CovidTestResult.negative')}}</option>
                <option :value="true">{{$t('CovidTestResult.positive')}}</option>
            </select>
            <div v-if="testedPositive">
                <date-picker v-model="$v.dateSymptomsBegan.$model"
                             :language="datePickerLanguage"
                             @selected="handleDateSelect"
                             calendar-class="calendar shadow"
                             input-class="covid-input"
                             class="position-static"
                             :placeholder="$t('CovidTestResult.startDatePlaceholder')">
                    <div slot="beforeCalendarHeader" class="small text-center text-info mt-2">
                        {{ $t('CovidTestResult.startDatePlaceholder') }}
                    </div>
                </date-picker>
                <date-picker v-model="$v.dateRecovered.$model"
                             :language="datePickerLanguage"
                             :disabled-dates="disabledDates"
                             calendar-class="calendar shadow"
                             input-class="covid-input"
                             class="position-static"
                             :placeholder="$t('CovidTestResult.recoveredDatePlaceholder')">
                    <div slot="beforeCalendarHeader" class="small text-center text-info mt-2">
                        {{ $t('CovidTestResult.recoveredDatePlaceholder') }}
                    </div>
                </date-picker>
                <span v-if="hasValidationError" class="small text-danger">{{$t('CovidTestResult.validationErrorMsg')}}</span>
            </div>
        </div>
        <template v-slot:footer>
            <action-button :title="$t('CovidTestResult.actionButtonTitle')" @action="setTestResult"/>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from '../layout/BaseLayout';
    import ActionButton from '../components/ActionButton';

    import DatePicker from 'vuejs-datepicker';
    import {en, es} from 'vuejs-datepicker/dist/locale'

    import LanguageSwitcher from '../components/LanguageSwitcher';
    import { required } from 'vuelidate/lib/validators';

    export default {
        name: "CovidTestResult",
        components: {BaseLayout, ActionButton, DatePicker, LanguageSwitcher},
        computed: {
            datePickerLanguage() {
                switch (this.$i18n.locale) {
                    case 'en': return en;
                    case 'es': return es;
                }
            },
            disabledDates() {
                let startDateInMs = new Date(this.dateSymptomsBegan).getTime();
                return {
                    to: new Date(startDateInMs + (1 * 24 * 60 * 60 * 1000)),
                }
            },
            hasValidationError() {
                return this.testedPositive
                    && ((this.$v.dateSymptomsBegan.$dirty && !this.$v.dateSymptomsBegan.required)
                        || (this.$v.dateRecovered.$dirty && !this.$v.dateRecovered.required))
            },
            testResult() {
                return Object.assign({
                    testedPositive: this.testedPositive
                }, this.testedPositive ? {
                    dateSymptomsBegan: this.dateSymptomsBegan,
                    dateRecovered: this.dateRecovered,
                } : {})
            }
        },
        data() {
            return {
                testedPositive: false,
                dateSymptomsBegan: null,
                dateRecovered: null,
            }
        },
        methods: {
            setTestResult() {
                this.$v.$touch();
                if(!this.hasValidationError) {
                    this.$store.dispatch('submitTestResult', this.testResult);
                    this.$router.push({path: '/daily-questions'});
                }
            },
            handleDateSelect(date) {
                if(this.dateRecovered) {
                    if(new Date(date) > new Date(this.dateRecovered)) {
                        this.dateRecovered = null;
                    }
                }
            },
        },
        validations: {
            testedPositive: {},
            dateSymptomsBegan: {required},
            dateRecovered: {required},
        }
    }
</script>

<style>
    .calendar {
        width: 90% !important;
        top: 50%;
        left: 50%;
        margin-left: -45%;
        margin-top: -35%;
    }
</style>