<template>
    <transition name="slide-message">
        <div class="x-message" :class="{[`${options.type}`]:true}" v-show="visible">
            <x-icon :name="options.type" class="x-icon"></x-icon>
            {{options.message}}
            <x-icon name="close" class="x-icon close" v-if="options.showClose" @click="closeMessage" style="width:12px;height:12px;"></x-icon>
        </div>
    </transition>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xMessage',
        components: { xIcon },
        props: {
            options: {
                type: Object,
                default: () => {
                    return {
                        type: 'success',
                        message: '',
                        duration: 2000,
                        showClose: false
                    }
                }
            }
        },
        data() { return { visible: false, timer: null } },
        methods: {
            closeMessage() {
                this.close();
            },
            autoClose() {
                this.timer = setTimeout(() => {
                    this.close();
                }, this.options.duration);
            },
            close() {
                this.visible = false;
                this.$el.addEventListener('transitionend', this.destroyEle);
            },
            destroyEle() {
                this.$el.removeEventListener('transitionend', this.destroyEle);
                this.$destroy();
            }
        },
        mounted() {
            !this.options.showClose && this.autoClose();
        },
        beforeDestroy() {
            this.timer ? clearTimeout(this.timer) : '';
            this.$el.remove();
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-message {
        position: fixed;
        z-index: 100;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        background: #fff;
        padding: .5em 1.2em;
        border-radius: 4px;
        box-shadow: $shadow;
        >.x-icon {
            margin-right: .4em;
            width: 25px;
            height: 25px;
            &.close {
                cursor: pointer;
                margin-left: 3em;
                margin-right: -.8em;
                color: $sub;
                &:hover {
                    color: $hover;
                }
            }
        }
        &.success {
            color: $success;
        }
        &.error {
            color: $error;
        }
        &.info {
            color:$link;
        }
        &.warning {
            color: $warning;
        }
    }
    @keyframes slide-down {
        from {
            transform: translateY(-100%) translateX(-50%);
            opacity: 0;
        }
        to {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
        }
    }
    .slide-message-enter-active,
    .slide-message-leave-active {
        transition: transform .3s ease-in-out, opacity .3s ease-in-out;
    }
    .slide-message-enter-to,
    .slide-message-leave {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
    }
    .slide-message-enter,
    .slide-message-leave-to {
        transform: translateY(-100%) translateX(-50%);
        opacity: 0;
    }
</style>