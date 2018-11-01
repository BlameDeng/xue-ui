<template>
    <transition name="spin-fade">
        <div class="x-spin-wrapper" v-if="appear" :class="{['full-screen']:fullScreen}">
            <div class="x-spin" :class="{['full-screen']:fullScreen}">
                <div class="circle" :style="{width:diameter+'px',height:diameter+'px'}">
                    <div class="top"></div>
                    <div class="left"></div>
                    <div class="right"></div>
                    <div class="fill" :class="{['full-screen']:fullScreen}"></div>
                </div>
                <span class="tips">{{tips}}</span>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'xSpin',
        props: {
            delay: Number,
            spinning: { type: Boolean, default: false },
            diameter: { type: Number, default: 20 },
            tips: String,
            fullScreen: { type: Boolean, default: false }
        },
        data() {
            return { appear: false, timerId: null }
        },
        methods: {
            listenWindow(e) {
                e.preventDefault && e.preventDefault()
                e.stopPropagation && e.stopPropagation()
                return false
            }
        },
        watch: {
            appear: {
                handler(val) {
                    if (!this.fullScreen) { return }
                    if (val) {
                        window.addEventListener('mousewheel', this.listenWindow)
                        window.addEventListener('keydown', this.listenWindow)
                    } else {
                        window.removeEventListener('mousewheel', this.listenWindow)
                        window.removeEventListener('keydown', this.listenWindow)
                    }
                },
                immediate: true
            },
            spinning: {
                handler(val) {
                    if (val && this.delay) {
                        this.timerId = setTimeout(() => {
                            this.appear = val
                        }, this.delay)
                        return
                    }
                    this.appear = val
                    if (!val && this.timerId) {
                        window.clearTimeout(this.timerId)
                    }
                },
                immediate: true
            }
        },
        beforeDestroy() {
            window.removeEventListener('mousewheel', this.listenWindow)
            window.removeEventListener('keydown', this.listenWindow)
            this.timerId && window.clearTimeout(this.timerId)
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-spin-wrapper {
        display: inline-flex;
        &.full-screen {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.05);
            z-index: 50;
        }
        >.x-spin {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            &.full-screen {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
            >.circle {
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-radius: 50%;
                overflow: hidden;
                >.top {
                    width: 4%;
                    height: 70%;
                    background: $p;
                    position: absolute;
                    top: -20%;
                    left: 48%;
                    animation: spin .9s linear infinite;
                    transform-origin: center bottom;
                }
                >.left {
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to bottom, $p, $p 15%, #fff 85%, #fff);
                    animation: spin .9s linear infinite;
                    transform-origin: right center;
                    box-shadow: 2px 0 2px -2px $p;
                }
                >.right {
                    width: 50%;
                    height: 100%;
                    background: $p;
                    animation: spin .9s linear infinite;
                    transform-origin: left center;
                }
                >.fill {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    width: 70%;
                    height: 70%;
                    background: #fff;
                    border-radius: 50%;
                }
            }
            >.tips {
                color: $p;
            }
        }
    }
    @keyframes spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .spin-fade-enter-active, .spin-fade-leave-active {
        transition: opacity .3s linear;
    }
    .spin-fade-enter, .spin-fade-leave-to {
        opacity: 0;
    }
</style>