<template>
    <base-layout>
        <template v-slot:header>
            <span>SafePass</span>
            <language-switcher/>
        </template>
        <div class="w-100" v-html="$t('AtRisk.pageMsg')" style="overflow-y: scroll"></div>
        <div class="w-100">
            <action-button :title="$t('AtRisk.actionButtonTitle')"
                           class="border-0"
                           :upper-case="false"
                           @action="viewCDCGuidelines"/>
        </div>
    </base-layout>
</template>

<script>
    import BaseLayout from '../layout/BaseLayout';
    import ActionButton from '../components/ActionButton';
    import LanguageSwitcher from '../components/LanguageSwitcher';

    export default {
        name: "AtRisk",
        components: {BaseLayout, ActionButton, LanguageSwitcher},
        methods: {
            viewCDCGuidelines() {
                let win = window.open('https://www.cdc.gov/coronavirus/2019-nCoV/index.html', '_blank');
                win.focus();
            }
        }
    }
</script>