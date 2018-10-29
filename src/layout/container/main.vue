<template>
    <div class="x-main">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xMain'
    }
</script>
<style scoped lang="scss">
    .x-main {
        flex-grow: 1;
    }
</style>