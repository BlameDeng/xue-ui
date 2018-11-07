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
            border-left: none;
            border-right: none;
            position: relative;
            &::before {
                content: '';
                display: none;
                position: absolute;
                top: -1px;
                left: 0;
                right: 0;
                bottom: -1px;
                border-left: 1px solid $p;
                border-right: 1px solid $p;
                border-radius: inherit;
                pointer-events: none;
                z-index: 1;
            }
            &:hover {
                &::before {
                    display: block;
                }
            }
            &:focus {
                &::before {
                    display: block;
                }
            }
            &:first-child {
                border-left: $borderbase;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                &:hover {
                    border-left-color: $p;
                }
                &::before {
                    left: -1px;
                }
            }
            &:last-child {
                border-right: $borderbase;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                &:hover {
                    border-right-color: $p;
                }
                &::before {
                    right: -1px;
                }
            }
        }
    }
</style>