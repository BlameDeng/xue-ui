<template>
    <transition name="x-slide-animation">
        <div class="x-slides-item" v-show="index===current" :class="{reverse}">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'xSlidesItem',
        props: { index: { type: Number, required: true } },
        data() {
            return { visible: false, reverse: false }
        },
        computed: {
            current() {
                return this.$parent.current;
            },
            len() {
                return this.$parent.len;
            },
            transitionTime() {
                return this.$parent.transitionTime;
            }
        },
        mounted() {
            this.$el.style.transition = `transform ${this.transitionTime}ms linear`;
        },
        watch: {
            current(val, oldVal) {
                if (val - oldVal > 0) {
                    this.reverse = false;
                }
                if (val - oldVal < 0) {
                    this.reverse = true;
                }
                //最后一个到第一个
                if (val - oldVal === -(this.len - 1)) {
                    this.reverse = false;
                }
                //第一个到最后一个
                if (val - oldVal === this.len - 1) {
                    this.reverse = true;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .x-slides-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
    }
    .x-slide-animation-leave-active {
        position: absolute;
        top: 0;
        left: 0;
    }
    .x-slide-animation-enter {
        transform: translateX(100%);
    }
    .x-slide-animation-enter.reverse {
        transform: translateX(-100%);
    }
    .x-slide-animation-leave-to {
        transform: translateX(-100%);
    }
    .x-slide-animation-leave-to.reverse {
        transform: translateX(100%);
    }
</style>