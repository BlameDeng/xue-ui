<template>
    <div class="x-slides" @mouseenter="mouseenter" @mouseleave="mouseleave" @touchstart="touchstart" @touchend="touchend" mode="in-out">
        <div class="x-slides-window">
            <slot></slot>
            <div class="slides-button">
                <span class="button" v-if="len" v-for="(n,index) in len" :key="n" @click="current=index" :class="{active:current===index}"></span>
            </div>
            <span class="icon-wrapper prev" @click="setCurrent(-1)">
                <x-icon name="right" class="x-icon"></x-icon>
            </span>
            <span class="icon-wrapper next" @click="setCurrent(1)">
                <x-icon name="right" class="x-icon"></x-icon>
            </span>
        </div>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xSlides',
        components: { xIcon },
        props: {
            duration: { type: Number, default: 3000 },
            transitionTime: { type: Number, default: 500 },
            autoPlay: { type: Boolean, default: true }
        },
        data() {
            return {
                current: 0,
                len: 0,
                timer: null,
                startTouch: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.len = this.$children.length - 2;
                this.startAutoPlay();
            })
        },
        methods: {
            startAutoPlay() {
                if (!this.autoPlay) { return }
                if (this.timer) { return }
                let run = () => {
                    this.setCurrent(1);
                    this.timer = setTimeout(run, this.duration);
                }
                this.timer = setTimeout(run, this.duration);
            },
            mouseenter() {
                if (this.timer) {
                    window.clearTimeout(this.timer);
                }
                this.timer = null;
            },
            mouseleave() {
                this.startAutoPlay();
            },
            setCurrent(num) {
                this.current += num;
                if (this.current >= this.len) {
                    this.current = 0;
                }
                if (this.current <= -1) {
                    this.current = this.len - 1;
                }
                this.$emit('current-change', this.current);
            },
            touchstart(e) {
                this.startTouch = e.touches[0];
            },
            touchend(e) {
                let { clientX } = e.changedTouches[0];
                let space = clientX - this.startTouch.clientX;
                if (Math.abs(space) <= 80) {
                    return
                } else {
                    space > 0 ? this.setCurrent(-1) : this.setCurrent(1);
                }
            }
        },
        beforeDestroy() {
            if (this.timer) {
                window.clearTimeout(this.timer);
            }
            this.timer = null;
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-slides {
        width: 100%;
        height: 100%;
        >.x-slides-window {
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            >.slides-button {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                text-align: center;
                >.button {
                    display: inline-block;
                    margin: 0 4px 4px;
                    height: 4px;
                    width: 30px;
                    background: $divider;
                    border-radius: 2px;
                    cursor: pointer;
                    &.active {
                        background: #fff;
                    }
                }
            }
            >.icon-wrapper {
                position: absolute;
                top: 50%;
                color: #fff;
                background: $bg;
                display: none;
                justify-content: center;
                align-items: center;
                padding: 4px;
                border-radius: 50%;
                cursor: pointer;
                &:hover {
                    background: $divider;
                }
                &.prev {
                    left: 0;
                    transform: translateY(-50%) rotateZ(180deg);
                }
                &.next {
                    right: 0;
                    transform: translateY(-50%);
                }
            }
            &:hover {
                >.icon-wrapper {
                    display: inline-flex;
                }
            }
        }
    }
</style>