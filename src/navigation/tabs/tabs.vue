<template>
    <div class="x-tabs">
        <div class="title-wrapper" ref="titleWrapper">
            <slot name="title"></slot>
            <div class="line" ref="line"></div>
        </div>
        <div class="default-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        name: 'xTabs',
        props: { selected: { type: [String, Number], required: true }, },
        data() { return { eventBus: new Vue() } },
        provide() { return { eventBus: this.eventBus } },
        mounted() {
            this.eventBus.$on('update:selected', (name, vm) => {
                this.$emit('update:selected', name);
                let line = this.$refs.line;
                let { left, right } = vm.$el.getBoundingClientRect();
                let { left: wrapperLeft } = this.$refs.titleWrapper.getBoundingClientRect();
                line.style.width = right - left + 'px';
                line.style.left = left - wrapperLeft + 'px';
            });
            let title = null;
            this.$children.forEach(vm => {
                if (vm.$options.name === 'xTabsTitle' && vm.name === this.selected) {
                    title = vm;
                }
            });
            this.eventBus.$emit('update:selected', this.selected, title);
        },
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-tabs {
        >.title-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            >.line {
                position: absolute;
                bottom: 0;
                background: $p;
                height: 2px;
                transition: all 0.3s linear;
                border-radius: 1px;
            }
        }
    }
</style>