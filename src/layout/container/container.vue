<template>
    <div class="x-container" :class="xClass">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xContainer',
        data() { return { hasSider: false } },
        computed: {
            xClass() {
                return {
                    ['has-sider']: this.hasSider
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$children.forEach(vm => {
                    if (vm.$options.name === 'xSider') {
                        this.hasSider = true;
                    }
                });
            })
        },
    }
</script>
<style scoped lang="scss">
    .x-container {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        &.has-sider {
            flex-direction: row;
        }
    }
</style>