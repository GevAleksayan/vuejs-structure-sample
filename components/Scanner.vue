<template>
    <div>
        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
            <div v-if="validationPending" class="validation-screen">
                Validation in progress...
            </div>
            <div v-if="validationFailure" class="validation-screen text-danger">
                <span class="h2">Temperature is not selected</span>
            </div>
        </qrcode-stream>
    </div>
</template>

<script>
    import { QrcodeStream } from 'vue-qrcode-reader';

    export default {
        components: { QrcodeStream },
        props: ['camera', 'allowScan'],
        data () {
            return {
                validationPending: false,
                validationFailure: false,
                result: null,
            }
        },
        methods: {
            async onInit (promise) {
                let error = '';
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        error = "ERROR: you need to grant camera access permisson"
                    } else if (error.name === 'NotFoundError') {
                        error = "ERROR: no camera on this device"
                    } else if (error.name === 'NotSupportedError') {
                        error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                        error = "ERROR: is the camera already in use?"
                    } else if (error.name === 'OverconstrainedError') {
                        error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        error = "ERROR: Stream API is not supported in this browser"
                    }
                    this.$emit('update:scannerError', error);
                }
            },
            async onDecode (content) {
                this.turnCameraOff();
                if(!this.allowScan) {
                    this.validationFailure = true;

                    await this.timeout(1800);

                    this.validationFailure = false;
                    this.turnCameraOn()
                } else {
                    this.validationPending = true;

                    await this.timeout(1200);

                    this.$emit('checkQRCode', content);
                }
            },
            turnCameraOn () {
                this.$emit('update:camera', 'auto');
            },
            turnCameraOff () {
                this.$emit('update:camera', 'off');
            },
            timeout (ms) {
                return new Promise(resolve => {
                    setTimeout(resolve, ms)
                })
            }
        }
    }
</script>

<style scoped>
    .validation-screen {
        position: absolute;
        width: 100%;
        height: 100%;

        background-color: rgba(255, 255, 255, .8);
        text-align: center;
        font-weight: bold;
        font-size: 1rem;
        padding: 10px;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
    }
</style>