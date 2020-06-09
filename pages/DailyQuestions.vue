<template>
    <base-layout>
        <template v-slot:header>
            <span>{{ $t('DailyQuestions.pageTitle.' + pageTitleFor)}}</span>
            <language-switcher/>
        </template>
        <div v-html="validatorName == 'userDailySymptoms' ?
                 $t('DailyQuestions.userSymptomsQuestion') :
                 $t('DailyQuestions.householdSymptomsQuestion')">
        </div>
        <div class="mb-3">
            <div v-for="(item, index) in dailyQuestions"
                 class="custom-control custom-checkbox ml-2 mb-2">
                <input v-model="$v[validatorName].$model"
                       @click="noSymptoms = false"
                       :value="item"
                       :id="index"
                       type="checkbox"
                       class="custom-control-input">
                <label class="custom-control-label font-weight-bold"
                       :for="index">
                    {{ item.question }}
                </label>
            </div>
            <div class="custom-control custom-checkbox ml-2">
                <input @click="emptyAllSelectedSymptoms"
                       :checked="noSymptoms"
                       id="noSymptoms"
                       class="custom-control-input"
                       type="checkbox">
                <label class="custom-control-label font-weight-bold" for="noSymptoms">None of the above</label>
            </div>
            <div class="px-3">
                <span v-if="hasValidationError" class="small text-danger">Choose symptom(s) if you have</span>
            </div>
        </div>
        <template v-slot:footer>
            <action-button :title="$t('DailyQuestions.actionButtonTitle')" @action="submit"/>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from '../layout/BaseLayout';
    import ActionButton from '../components/ActionButton';
    import LanguageSwitcher from '../components/LanguageSwitcher';
    import { mapGetters } from 'vuex';
    import { upperCaseFirst } from "../helper";

    const atLeastOne = arr => !!arr.length;

    export default {
        name: "DailyQuestions",
        components: {BaseLayout, ActionButton, LanguageSwitcher},
        computed: {
            ...mapGetters(['dailyQuestions']),
            hasValidationError() {
                return !this.noSymptoms
                    && this.$v[this.validatorName].$dirty
                    && !this.$v[this.validatorName].atLeastOne;
            },
        },
        data() {
            return {
                userDailySymptoms: [],
                householdDailySymptoms: [],
                noSymptoms: false,
                validatorName: 'userDailySymptoms',
                pageTitleFor: 'user',
            }
        },
        mounted() {
            this.getDailyQuestions();
        },
        methods: {
            getDailyQuestions() {
                this.$store.dispatch('getDailyQuestions');
            },
            emptyAllSelectedSymptoms() {
                this.$v[this.validatorName].$touch();
                this[this.validatorName] = [];
                this.noSymptoms = !this.noSymptoms;
            },
            submit() {
                this.$v[this.validatorName].$touch();
                if(!this.hasValidationError) {
                    this.$store.dispatch(`submit${upperCaseFirst(this.validatorName)}`, this.$v[this.validatorName].$model);
                    if(this.validatorName == 'userDailySymptoms') {
                        this.validatorName = 'householdDailySymptoms';
                        this.pageTitleFor = 'household';
                        this.noSymptoms = false;
                    } else {
                        this.$router.push({path: '/temperature'})
                    }
                }
            },
        },
        validations() {
            return {
                [this.validatorName]: {atLeastOne}
            }
        }
    }
</script>

<style scoped>

</style>