<template>
    <div class="x-nav" :class="{vertical}">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xNav',
        props: {
            selected: { type: String },
            vertical: { type: Boolean, default: false }
        },
        data() { return { current: '' } },
        provide() {
            return { root: this };
        },
        mounted() {
            this.$on('click-item', this.update);
            this.$on('click-sub', this.update);
        },
        methods: {
            update(name) {
                this.current = name;
                this.$emit('update:selected', name);
                this.$emit('selected-change', name);
            },
            openSub() {
                this.$nextTick(() => {
                    this.current = this.selected;
                    this.$emit('click-sub', this.current);
                })
            }
        },
        watch: {
            selected: {
                handler(val) {
                    this.current = val;
                },
                immediate: true
            }
        },
        beforeDestroy() {
            this.$off('click-item', this.update);
            this.$off('click-sub', this.update);
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-nav {
        display: flex;
        cursor: pointer;
        font-size: 14px;
        color: $content;
        user-select: none;
        &.vertical {
            flex-direction: column;
        }
    }
</style>