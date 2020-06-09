<template>
    <base-layout>
        <template v-slot:header>
            <span>{{$t('Temperature.pageTitle')}}</span>
            <language-switcher/>
        </template>
        <div class="d-flex flex-column justify-content-between h-100">
            <div class="mb-3">
                <p class="mb-3 text-center">{{$t('Temperature.temperatureInputLabel')}}</p>
                <div class="form-group mx-auto" style="width: 90%">
                    <select v-model="$v.temperature.$model"
                            class="temperature-select form-control border text-center text-secondary w-100 bg-white p-2"
                            :class="{'border-secondary': !temperatureRequired, 'border-danger': temperatureRequired}"
                            style="font-size: 20px;">
                        <option value="">{{$t('Temperature.temperatureInputPlaceholder')}}</option>
                        <option v-for="temperature in temperatures" :value="temperature">{{temperature}}</option>
                    </select>
                </div>
                <div class="text-center w-100">
                    <span v-if="temperatureRequired" class="small text-danger">{{$t('Temperature.validationErrorMsg')}}</span>
                </div>
            </div>
            <div class="px-3 text-center">
                <img v-if="photoUrl"
                     :src="photoUrl"
                     style="width: 30vh; height: 30vh;"
                     alt="temperature-image">
            </div>
            <div>
                <p v-if="!this.selectedPhoto.name" class="mb-0">{{$t('Temperature.fileInputLabel')}}</p>
                <input class="d-none" ref="fileInput" type="file" @change="onFileChange">
            </div>
        </div>
        <template v-slot:footer>
            <action-button class="my-3" :title="actionButtonTitle" @action="action"/>
        </template>
    </base-layout>
</template>

<script>
    import temperatureMixin from '../mixins/temperature';
    import BaseLayout from '../layout/BaseLayout';
    import ActionButton from '../components/ActionButton';
    import LanguageSwitcher from '../components/LanguageSwitcher';
    import { required } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';

    export default {
        name: "Temperature",
        components: {BaseLayout, ActionButton, LanguageSwitcher},
        mixins: [temperatureMixin],
        computed: {
            ...mapGetters(['userSymptomsWeight', 'householdSymptomsWeight']),
            actionButtonTitle() {
                return this.$t(`Temperature.actionButtonTitle.${!!this.selectedPhoto.name ? 'submit' : 'uploadPhoto'}`);
            },
            action() {
                return !!this.selectedPhoto.name ? this.submit : this.selectPhoto;
            },
        },
        data() {
            return {
                temperature: '',
                photoUrl: '',
                selectedPhoto: {},
            }
        },
        methods: {
            selectPhoto() {
                this.$v.temperature.$touch();
                if(!this.temperatureRequired) {
                    this.$refs.fileInput.click();
                }
            },
            submit() {
                this.$store.dispatch('submitTemperatureForToday', {
                    temperature: this.temperature,
                    photo: this.selectedPhoto,
                });
                if(this.temperature < 98.6 && this.userSymptomsWeight < 150) {
                    this.$store.dispatch('generateQRCode');
                    this.$router.push({path: '/qr-code'})
                } else {
                    this.$router.push({path: '/at-risk'})
                }
            },
            onFileChange(event) {
                this.selectedPhoto = event.target.files[0];
                this.photoUrl = URL.createObjectURL(this.selectedPhoto);
            }
        },
        validations: {
            temperature: {required},
        }
    }
</script>

<style scoped>
    input{
        outline: none;
    }
    .temperature-select {
        text-align-last:center !important;
    }
</style>