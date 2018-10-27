<template>
    <div class="tabs-pane" :class="{active}" v-show="active">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xTabsPane',
        inject: ['eventBus'],
        props: { name: { type: [String, Number], required: true } },
        data() { return { active: false } },
        created() {
            this.eventBus.$on('update:selected', (name) => {
                this.active = this.name === name;
            })
        },
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .tabs-pane {
        &.active {
            background: $bg;
        }
    }
</style>