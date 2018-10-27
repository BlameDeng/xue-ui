<template>
    <transition name="fade-confirm">
        <div class="x-confirm" v-show="visible">
            <div class="confirm-info">
                <div class="info-title">{{title}}</div>
                <div class="info-message">
                    <x-icon name="warning" class="x-icon"></x-icon>{{message}}
                </div>
                <div class="button-wrapper">
                    <x-button @click="onClick('cancle')">{{cancleText}}</x-button>
                    <x-button wave @click="onClick('confirm')">{{confirmText}}</x-button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    import xButton from '../../basic/button/button.vue'
    export default {
        name: 'xConfirm',
        components: { xButton, xIcon },
        props: {
            title: { type: String, default: '提示' },
            message: String,
            confirmText: { type: String, default: '继续' },
            cancleText: { type: String, default: '取消' },
        },
        data() {
            return { promiseStatus: null, visible: false }
        },
        methods: {
            onClick(type) {
                if (type === 'cancle') {
                    this.promiseStatus.reject();
                } else {
                    this.promiseStatus.resolve();
                }
                this.visible = false;
                this.$el.addEventListener('transitionend', this.destroyEle);
            },
            confirm() {
                return new Promise((resolve, reject) => {
                    this.promiseStatus = { resolve, reject };
                })
            },
            destroyEle() {
                this.$el.removeEventListener('transitioncancel', this.destroyEle);
                this.$destroy();
            }
        },
        beforeDestroy() {
            this.$el.remove();
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-confirm {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        >.confirm-info {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 400px;
            height: 140px;
            background: #fff;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            >.info-title {
                margin-bottom: 15px;
                font-size: 16px;
                color: $title;
            }
            >.info-message {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                color: $content;
                padding-left: 10px;
                font-size: 14px;
                >.x-icon {
                    color: $warning;
                    font-size: 16px;
                    margin-right: 4px;
                }
            }
            >.button-wrapper {
                margin-top: 15px;
                text-align: end;
            }
        }
    }
    .fade-confirm-enter-active, .fade-confirm-leave-active {
        transition: opacity .3s ease-in-out;
    }
    .fade-confirm-enter-to, .fade-confirm-leave {
        opacity: 1;
    }
    .fade-confirm-enter, .fade-confirm-leave-to {
        opacity: 0;
    }
</style>