<template>
    <div class="x-nav-sub">
        <p class="title" :class="{active:open||active,vertical}" @click="onClick">
            <slot name="title"></slot>
            <x-icon name="right" class="x-icon" :class="{open}"></x-icon>
        </p>
        <div class="popover" :class="{vertical,open}">
            <x-spread :visible="open">
                <slot></slot>
            </x-spread>
        </div>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    import xSpread from '../../others/spread/spread.vue'
    export default {
        name: 'xNavSub',
        components: { xSpread, xIcon },
        props: { name: { type: String, required: true } },
        data() {
            return {
                open: false,
                childrenNames: null
            }
        },
        inject: ['root'],
        computed: {
            current() { return this.root.current; },
            vertical() { return this.root.vertical; },
            active() { return this.childrenNames && (this.childrenNames.indexOf(this.current) > -1 || this.name === this.current); }
        },
        mounted() {
            this.$nextTick(() => {
                let array = [];
                let getNames = (vms) => {
                    vms.forEach(vm => {
                        vm.name && array.push(vm.name);
                        if (vm.$children) {
                            getNames(vm.$children);
                        }
                    });
                }
                getNames(this.$children);
                this.childrenNames = array;
                this.open = this.childrenNames && (this.childrenNames.indexOf(this.current) > -1 || this.name === this.current);
            })
            this.root.$on('click-item', this.closePop);
            this.root.$on('click-sub', this.checkPop);
        },
        methods: {
            onClick() {
                this.root.$emit('click-sub', this.name);
            },
            closePop(name) {
                if (!this.vertical) {
                    this.open = false;
                }
                if (this.vertical) {
                    this.open = this.childrenNames.indexOf(name) > -1;
                }
            },
            checkPop(name) {
                if (this.name === name) {
                    this.open = !this.open;
                } else if (this.childrenNames.indexOf(name) > -1) {
                    this.open = true;
                } else {
                    this.open = false;
                }
            }
        },
        beforeDestroy() {
            this.root.$off('click-item', this.closePop);
            this.root.$off('click-sub', this.checkPop);
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-nav-sub {
        position: relative;
        >.title {
            padding: 8px 20px;
            position: relative;
            width: 100%;
            min-width: 8em;
            white-space: nowrap;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 15px;
            &:hover {
                background: $bg;
            }
            &.active {
                overflow: hidden;
                color: $p;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    width: 100%;
                    background: $dp;
                    border-radius: 2px;
                    animation: slide .3s linear forwards;
                }
                &.vertical {
                    color: $content;
                }
            }
            >.x-icon {
                margin-left: auto;
                transition: transform .3s;
                &.open {
                    transform: rotateZ(90deg);
                }
            }
        }
        .popover {
            position: absolute;
            top: 100%;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            width: 100%;
            z-index: 5;
            background: #fff;
            &.open {
                width: 100%;
                border: .5px solid $border;
                box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
            }
            &.vertical {
                position: static;
                border-radius: 0;
                width: 100%;
                border: none;
                box-shadow: none;
            }
        }
    }
    .x-nav-sub .x-nav-sub .title {
        white-space: nowrap;
        font-size: 14px;
        padding-left: 25px;
        &.active {
            color: $p;
            &::after {
                display: none;
            }
            background: $bg;
            &.vertical {
                color: $content;
            }
        }
    }
    .x-nav-sub .x-nav-sub .popover {
        position: absolute;
        top: 0;
        left: 100%;
        margin-left: 5px;
        border-radius: 4px;
        z-index: 5;
        width: 100%;
        background: #fff;
        &.open {
            width: 100%;
            border: .5px solid $border;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
        }
        &.vertical {
            position: static;
            margin-left: 0;
            border-radius: 0;
            border: none;
            box-shadow: none;
        }
    }
    @keyframes slide {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }
</style>