<template>
    <div class="x-slides" @mouseenter="enter" @mouseleave="leave">
        <div class="x-view" ref="view" :class="{transition}">
            <slot></slot>
        </div>
        <x-icon name="left" class="icon prev" @click="changeCurrent(-1)"></x-icon>
        <x-icon name="right" class="icon next" @click="changeCurrent(1)"></x-icon>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xSlides',
        components: { xIcon },
        props: {
            duration: { type: Number, default: 3000 },
            autoPlay: { type: Boolean, default: true }
        },
        data() {
            return {
                current: 1,
                transition: true,
                length: 0,
                timerId: null,
                changing: false
            }
        },
        watch: {
            current(newVal, oldVal) {
                if (!this.transition) {
                    this.transition = true
                }
                let view = this.$refs.view
                //最后一张到第一张
                if (newVal === 1 && oldVal === this.length) {
                    view.style.transform = `translateX(${-100 * (this.length + 1)}%)`
                    view.addEventListener('transitionend', this.reset)
                    this.changing = true
                    return
                }
                //第一张到最后一张
                if (newVal === this.length && oldVal === 1) {
                    view.style.transform = `translate(0)`
                    view.addEventListener('transitionend', this.reset)
                    this.changing = true
                    return
                }
                view.style.transform = `translateX(${-100 * newVal}%)`
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.cloneDom()
                this.autoPlay && this.startAutoPlay()
            })
        },
        beforeDestroy() {
            this.changing = false
            this.$refs.view.removeEventListener('transitionend', this.reset)
        },
        methods: {
            cloneDom() {
                let nodes = this.$slots.default.filter(node => node.elm.nodeType !== 3)   
                nodes.forEach(node => {
                    node.elm.style['flex-shrink'] = 0
                })
                this.length=nodes.length
                const first = nodes[0].elm.cloneNode(true)
                const last = nodes[nodes.length - 1].elm.cloneNode(true)
                this.$refs.view.prepend(last)
                this.$refs.view.append(first)
            },
            reset() {
                let view = this.$refs.view
                this.transition = false
                if (this.current === 1) {
                    view.style.transform = `translateX(-100%)`
                } else {
                    view.style.transform = `translateX(${-100 * this.length}%)`
                }
                this.changing = false
                view.removeEventListener('transitionend', this.reset)
            },
            startAutoPlay() {
                let play = () => {
                    this.changeCurrent(1)
                    this.timerId = setTimeout(play, this.duration)
                }
                this.timerId = setTimeout(play, this.duration)
            },
            changeCurrent(n) {
                //防止在切换图片时改变current导致播放混乱
                if (this.changing) { return }
                this.current += n
                if (this.current > this.length) {
                    this.current = 1
                } else if (this.current < 1) {
                    this.current = this.length
                }
            },
            stopPlay() {
                window.clearTimeout(this.timerId)
                this.timerId = null
            },
            enter() {
                this.timerId && this.stopPlay()
            },
            leave() {
                this.autoPlay && !this.timerId && this.startAutoPlay()
            }
        }
    }
</script>
<style scoped lang="scss">
    .x-slides {
        width: 100%;
        overflow: hidden;
        position: relative;
        >.icon {
            width: 30px;
            height: 30px;
            color: #fff;
            position: absolute;
            z-index: 10;
            cursor: pointer;
            opacity: 0;
            &.prev {
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            &.next {
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        &:hover {
            >.icon {
                opacity: .85;
            }
        }
        >.x-view {
            display: flex;
            width: 100%;
            transform: translateX(-100%);
            &.transition {
                transition: transform 500ms linear;
            }
        }
    }
</style>