<template>
    <base-layout>
        <template v-slot:header>
            <span class="small">{{ today }}</span>
        </template>
        <p>Scan barcode or enter SafePass code below:</p>
        <div class="mb-3 position-relative">
                <span v-if="temperatureRequired"
                      class="position-absolute bg-white small text-danger"
                      style="top: -8px; left: 8px;">required</span>
            <select v-model="$v.temperature.$model"
                    class="temperature-select border text-center text-secondary w-100 bg-white p-2"
                    :class="{'border-secondary': !temperatureRequired, 'border-danger': temperatureRequired}"
                    style="font-size: 18px;">
                <option value="">Select Temperature</option>
                <option v-for="temperature in temperatures" :value="temperature">{{temperature}}</option>
            </select>
        </div>
        <div class="position-relative h-50 d-flex justify-content-center align-items-center">
            <scanner :allowScan="allowScan"
                     :camera.sync="camera"
                     :scannerError.sync="scannerError"
                     @checkQRCode="checkQRCode"
                     class="border border-secondary"/>
            <span class="position-absolute text-danger text-center small px-2" style="z-index: -99;">{{scannerError}}</span>
        </div>
        <div class="w-100 text-center pt-1"><span>or</span></div>
        <div class="position-relative">
            <span v-if="responseError.length"
                  class="small text-danger position-absolute bg-white"
                  style="top: -8px; left: 5px">{{responseError}}</span>
            <input v-model="$v.code.$model"
                   @input="responseError = ''"
                   type="text"
                   class="text-center border border-secondary w-100 p-2 text-secondary"
                   :class="{'border-danger': responseError.length}"
                   placeholder="Enter Code">
        </div>
        <template v-slot:footer>
            <action-button v-if="code.length" title="submit" @action="submitCode"/>
        </template>
    </base-layout>
</template>

<script>
    import temperatureMixin from '../../mixins/temperature';
    import BaseLayout from '../../layout/BaseLayout';
    import ActionButton from '../../components/ActionButton';
    import Scanner from '../../components/Scanner';
    import { required } from 'vuelidate/lib/validators';

    export default {
        name: "ScanEmployee",
        components: {BaseLayout, ActionButton, Scanner},
        props: ['mode'],
        mixins: [temperatureMixin],
        computed: {
            allowScan() {
                return !!this.temperature.length;
            },
            today() {
                return this.$moment().format('MMM DD YYYY')
            },
        },
        data() {
            return {
                temperature: '',
                code: '',
                camera: 'auto',
                scannerError: '',
                responseError: '',
                successSound: new Audio('/audio/success.wav'),
                errorSound: new Audio('/audio/error.mp3'),
            }
        },
        methods: {
            submitCode() {
                this.$v.$touch();
                if(!this.$v.temperature.$invalid && !this.$v.code.$invalid) {
                    this.checkQRCode(this.$v.code.$model);
                }
            },
            checkQRCode(qr_token) {
                let params = {
                    admit: false,
                    error: '',
                };
                this.$store.dispatch('checkQRCode', qr_token).then(response => {
                    if(response.data.errors) {
                        this.errorSound.play();
                        params.error = response.data.errors[0];
                    } else {
                        this.successSound.play();
                        params.admit = response.data.data.safe;
                    }
                    this.$router.push({name: 'result', params});
                });
            },
        },
        validations: {
            temperature: {required},
            code: {required},
        }
    }
</script>

<style>
    .temperature-select {
        text-align-last:center !important;
    }
    .temperature-select option {
        text-align: center !important;
    }
    .camera {
        object-fit: contain !important;
    }
</style>