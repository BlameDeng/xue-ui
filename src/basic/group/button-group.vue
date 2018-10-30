<template>
    <div class="x-button-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xButtonGroup',
        mounted() {
            for (let node of this.$el.children) {
                let name = node.tagName.toLowerCase();
                if (name !== 'button') {
                    console.log(`x-group的子元素应该全是x-button，否则会影响样式，但你的是${name}`);
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../color.scss';
    .x-button-group {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        >.x-button {
            border-radius: 0;
            border-left-color: transparent;
            border-right-color: transparent;
            &:hover {
                border-left-color: $p;
                border-right-color: $p;
            }
            &:first-child {
                border-left-color: $border;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                &:hover {
                    border-left-color: $p;
                }
            }
            &:last-child {
                border-right-color: $border;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                &:hover {
                    border-right-color: $p;
                }
            }
        }
    }
</style>