<template>
    <div class="page-title py-2">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageTitle",
        props: [],
    }
</script>
<style>
    .page-title {
        color: #0636e2;
        font-weight: 300;
        font-size: 1em;
        border-bottom: 2px solid #dedede;
    }
</style>