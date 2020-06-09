<template>
    <div class="btn-group position-absolute" :style="positionStyle">
        <button type="button" class="btn btn-light dropdown-toggle px-1 py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <img class="rounded" width="17" height="17" :src="activeLanguage.icon" alt="language icon">
        </button>
        <div class="dropdown-menu py-0"
             :class="'dropdown-menu-' + position">
            <button v-for="(language, index) in languages"
                    @click="changeLanguage(language)"
                    class="dropdown-item py-2"
                    :class="{'border-top': index != 0}"
                    type="button">
                <img class="rounded" width="18" height="18" :src="language.icon" alt="language icon">
                <span class="ml-2" style="font-size: 16px;">{{language.name}}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import { upperCaseFirst } from "../helper";

    export default {
        name: "LanguageSwitcher",
        props: {
            position: {
                type: String,
                default: 'right',
            }
        },
        computed: {
            positionStyle() {
                return {
                    [this.position]: '3px',
                }
            }
        },
        data() {
            let languages = [
                {
                    code: 'en',
                    name: 'English',
                    icon: '/usa-flag.png',
                },
                {
                    code: 'es',
                    name: 'Española',
                    icon: '/spain-flag.png',
                }
            ];
            return {
                activeLanguage: _.find(languages, {code: this.$i18n.locale}),
                showLangs: false,
                languages: languages,
            }
        },
        methods: {
            changeLanguage(language) {
                this.showLangs = false;
                this.activeLanguage = language;
                this.$i18n.locale = language.code;
            },
            upperCaseFirst(languageCode) {
                return upperCaseFirst(languageCode);
            }
        }
    }
</script>

<style scoped>

</style>