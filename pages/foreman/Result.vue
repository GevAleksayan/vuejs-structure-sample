<template>
    <base-layout main-class="d-flex text-center flex-column justify-content-center">
        <template v-slot:header>
            <span>{{ today }}</span>
        </template>
        <div v-if="error">
            <p v-if="!admit" class="h1 font-weight-light text-danger">{{error}}</p>
        </div>
        <div v-else>
            <p v-if="!admit" class="h1 mb-4 font-weight-light text-danger">Do not admit</p>
            <p class="h1 font-weight-bold" :class="{'text-success': admit, 'text-danger': !admit}">KSW2D9</p>
            <p v-if="admit" class="h1 mt-3 font-weight-light text-success">is safe</p>
        </div>
        <template v-slot:footer>
            <action-button title="scan next" @action="scanNext"/>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from '../../layout/BaseLayout';
    import ActionButton from '../../components/ActionButton';

    export default {
        name: "Result",
        props: ['admit', 'error'],
        components: {BaseLayout, ActionButton},
        computed: {
            today() {
                return this.$moment().format('MMM DD YYYY')
            },
        },
        beforeRouteEnter(to, from, next) {
            (to.params.admit != undefined) ? next() : next('/scan');
        },
        mounted() {
            setTimeout(this.scanNext, 2000);
        },
        methods: {
            scanNext() {
                this.$router.push({path: '/scan'});
            }
        }
    }
</script>