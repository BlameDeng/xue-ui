<template>
    <div class="x-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xGroup',
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
    .x-group {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        >.x-button {
            border-radius: 0;
            border-left: none;
            border-right: none;
            &:first-child {
                border-left: .5px solid $border;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                &:hover {
                    border-left: .5px solid $lp;
                }
            }
            &:last-child {
                border-right: .5px solid $border;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                &:hover {
                    border-right: .5px solid $lp;
                }
            }
        }
    }
</style>