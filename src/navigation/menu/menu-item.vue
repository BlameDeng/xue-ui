<template>
    <div class="x-menu-item" :class="{active}" @click="onClick">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xMenuItem',
        inject: ['eventBus'],
        props: {
            index: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return { active: false, pathArr: null }
        },
        computed: {
            path() {
                return this.pathArr && this.pathArr.join('/')
            }
        },
        mounted() {
            this.eventBus.$on('click-item', this.listenItem)
            this.eventBus.$on('vertical-prop', this.listenVertical)
            this.eventBus.$on('refresh', this.listenRefresh)
            this.$nextTick(() => {
                this.getNames(this)
            })
        },
        methods: {
            //构建对应path
            getNames(vm) {
                this.pathArr = this.pathArr || []
                vm.$options.name === 'xMenuItem' || vm.$options.name === 'xSubMenu' ?
                    this.pathArr.unshift(vm.name) :
                    ''
                if (vm.$parent) {
                    this.getNames.call(this, vm.$parent)
                }
            },
            onClick() {
                this.active = true
                this.eventBus.$emit('click-item', {
                    index: this.index,
                    name: this.name,
                    path: this.path
                })
            },
            listenItem(data) {
                //所有item被点击会抛出自己的index，其他item检查，不是自己被点击就deactive
                this.active = this.index === data.index
            },
            listenVertical(value) {
                this.vertical = value
            },
            listenRefresh(data) {
                //监听到index检查自身active
                if (data.index) {
                    this.active = this.index === data.index
                    //监听到path，如果是自己则抛出index
                } else if (data.path === this.path) {
                    this.eventBus.$emit('refresh', { index: this.index })
                }
            }
        },
        beforeDestroy() {
            this.eventBus.$off('click-item', this.listenItem)
            this.eventBus.$off('vertical-prop', this.listenVertical)
            this.eventBus.$off('refresh', this.listenRefresh)
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-menu-item {
        width: 100%;
        padding: 5px 15px;
        white-space: nowrap;
        min-width: 8em;
        font-size: 14px;
        color: $content;
        &:hover {
            background: $ha;
        }
        &.active {
            overflow: hidden;
            color: $lp;
            background: $ha;
        }
    }
    .x-sub-menu .x-menu-item {
        &:first-child {
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
        }
        &:last-child {
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
        }
    }
    .x-sub-menu.vertical .x-menu-item {
        &:first-child {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        &:last-child {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
        padding-left: 25px;
    }
    .x-sub-menu.vertical .x-sub-menu.vertical .x-menu-item {
        color: $sub;
        padding-left: 35px;
        &.active {
            color: $lp;
        }
    }
</style>