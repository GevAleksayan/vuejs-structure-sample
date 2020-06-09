<template>
    <base-layout :footer="false" main-class="pt-0 px-0 d-flex justify-content-center align-items-center bg-success">
        <template v-slot:header>
            <span>SafePass</span>
            <language-switcher/>
        </template>
        <div class="mb-3">
            <div class="text-center text-white">
                <p class="mb-4 text-center">{{$t('QRCode.pageMsg')}}</p>
                <p class="mb-0" style="font-size: 28px;">SafePass</p>
                <p class="mb-3 font-weight-bold" style="font-size: 24px;">April 22, 2020</p>
                <span class="p-2 bg-white d-inline-block">
                        <qrcode-vue :value="QRCode.qr_token" size="150" level="H"></qrcode-vue>
                    </span>
                <p class="py-3" style="font-size: 28px;">{{QRCode.qr_token}}</p>
            </div>
        </div>
    </base-layout>
</template>

<script>
    import BaseLayout from '../layout/BaseLayout';
    import QrcodeVue from 'qrcode.vue';
    import LanguageSwitcher from '../components/LanguageSwitcher';
    import { mapGetters } from 'vuex';

    export default {
        name: "QRCode",
        components: {BaseLayout, QrcodeVue, LanguageSwitcher},
        computed: {
            ...mapGetters(['QRCode']),
        },
        data() {
            return {

            }
        }
    }
</script>