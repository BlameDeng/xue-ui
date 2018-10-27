<template>
    <div class="x-tabs-title" :class="{active,disabled}" @click="onClick">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xTabsTitle',
        props: {
            disabled: { type: Boolean, default: false },
            name: { type: [String, Number], required: true }
        },
        inject: ['eventBus'],
        data() { return { active: false } },
        created() {
            if (this.eventBus) {
                this.eventBus.$on('update:selected', (name) => {
                    this.active = this.name === name;
                })
            }
        },
        methods: {
            onClick() {
                this.disabled ? 0 : this.eventBus.$emit('update:selected', this.name, this);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-tabs-title {
        flex-shrink: 0;
        padding: .5em 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;
        user-select: none;
        &.active {
            background: $bg;
            color: $p;
            font-weight: bold;
        }
        &.disabled {
            color: $disabled;
            cursor: not-allowed;
        }
    }
</style>