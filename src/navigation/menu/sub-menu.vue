<template>
    <div class="x-sub-menu" :class="{open:selfOpen,vertical}">
        <div class="title" @click="onClick">
            <slot name="title"></slot>
            <x-icon name="right" class="x-icon"></x-icon>
        </div>
        <div class="popover">
            <x-spread :visible="selfOpen">
                <slot></slot>
            </x-spread>
        </div>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    import xSpread from '../../others/spread/spread.vue'
    export default {
        name: 'xSubMenu',
        components: { xSpread, xIcon },
        inject: ['eventBus'],
        props: {
            index: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            open: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                selfOpen: false,
                vertical: false,
                clickable: true
            }
        },
        computed: {
            indexArr() {
                return this.index.split('-')
            }
        },
        created() {
            this.selfOpen = this.open
        },
        mounted() {
            //item被点击，抛出值为一个对象{index,name,path}
            this.eventBus.$on('click-item', this.listenItem)
            //sub被点击，抛出值为一个字符串 index
            this.eventBus.$on('click-sub', this.listenSub)
            //传递vertical 值为Boolean
            this.eventBus.$on('vertical-prop', this.listenVertical)
            //更新展开状态，值为对象{index}或{path}
            this.eventBus.$on('refresh', this.listenRefresh)
        },
        methods: {
            onClick() {
                this.selfOpen = !this.selfOpen
                this.eventBus.$emit('click-sub', this.index)
            },
            listenItem(data) {
                //如果默认展开 直接返回
                if (this.open) { return }
                //横向菜单时，点击item直接关闭所有sub，纵向菜单调用refresh逻辑
                !this.vertical ? (this.selfOpen = false) : this.listenRefresh(data)
            },
            listenSub(index) {
                if (this.open) { return }
                //当sub被点击时，所有sub检查index，不在路径中的sub关闭，被点击的sub开关状态由点击事件确定
                if (this.index === index) {
                    return
                }
                let arr = index.split('-')
                this.indexArr.forEach((str, n) => {
                    str !== arr[n] ? this.selfOpen = false : ''
                })
            },
            listenVertical(value) {
                this.vertical = value
            },
            listenRefresh(data) {
                if (this.open) { return }
                //检查sub是否在index路径中
                if (data.index) {
                    let arr = data.index.split('-')
                    let result = true
                    this.indexArr.forEach((str, n) => {
                        str !== arr[n] ? (result = false) : ''
                    })
                    //如果在路径中，打开 如果不在路径中，关闭
                    this.selfOpen = result
                }
            }
        },
        beforeDestroy() {
            this.eventBus.$off('click-item', this.listenItem)
            this.eventBus.$off('click-sub', this.listenSub)
            this.eventBus.$off('vertical-prop', this.listenVertical)
            this.eventBus.$off('refresh', this.listenRefresh)
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-sub-menu {
        color: $main;
        font-size: 14px;
        position: relative;
        width: 100%;
        >.title {
            padding: 5px 15px;
            position: relative;
            width: 100%;
            min-width: 8em;
            white-space: nowrap;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &:hover {
                background: $habg;
            }
            >.x-icon {
                margin-left: auto;
                transition: transform 0.3s;
                color: $sub;
            }
        }
        >.popover {
            width: 100%;
            position: absolute;
            margin-top: 2px;
            top: 100%;
            left: 0;
            background: #fff;
            border-radius: 2px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        &.open {
            >.title {
                >.x-icon {
                    transform: rotateZ(90deg);
                }
            }
        }
    }
    .x-sub-menu.vertical {
        color: $main;
        font-size: 14px;
        >.title {
            padding: 5px 15px;
            position: relative;
            width: 100%;
            min-width: 8em;
            white-space: nowrap;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &:hover {
                background: $habg;
            }
            >.x-icon {
                margin-left: auto;
                transition: transform 0.3s;
            }
        }
        >.popover {
            position: static;
            box-shadow: none;
        }
        &.open {
            >.title {
                >.x-icon {
                    transform: rotateZ(90deg);
                }
            }
        }
    }
    .x-sub-menu .x-sub-menu {
        &:first-child {
            .title {
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;
            }
        }
        &:last-child {
            .title {
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
            }
        }
    }
    .x-sub-menu.vertical .x-sub-menu.vertical .title {
        padding-left: 25px;
    }
    .x-sub-menu .x-sub-menu .popover {
        top: 0;
        left: 100%;
        margin-top: 0;
        margin-left: 2px;
    }
    .x-sub-menu.vertical .x-sub-menu.vertical .popover {
        margin-left: 0;
    }
</style>