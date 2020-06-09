<template>
    <button class="action-btn mx-auto covid-blue" @click="$emit('action')">
        {{upperCase ? titleUpperCase : title}}
    </button>
</template>

<script>
    export default {
        name: "ActionButton",
        computed: {
            titleUpperCase() {
                return this.title.toUpperCase();
            }
        },
        props: {
            title: String,
            upperCase: {
                type: Boolean,
                default: true,
            },
        },
    }
</script>

<style scoped>
    .action-btn {
        outline: none;
        padding: 7px;
        font-size: 1.5rem;
        font-weight: 400;
        border: 1px solid #4F81BD;
        border-radius: 5px;
        /*color: #4F81BD;*/
        width: 90%;
        background-color: #fff;
        cursor: pointer;
    }
    /*.action-btn:hover, .action-btn:focus {*/
    /*    outline: none;*/
    /*    color: #fff;*/
    /*    !*border: 1px solid #4F81BD;*!*/
    /*    background-color: #4F81BD;*/
    /*}*/
</style>