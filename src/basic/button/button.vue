<template>
    <button type="button" class="x-button" :class="{[`icon-${position}`]:true,['x-wave']:wave}" @click="onClick">
        <x-icon v-if="icon" :name="icon" class="x-icon"></x-icon>
        <span class="slot-content">
            <slot></slot>
        </span>
        <transition name="wave">
            <span class="wave-dot" ref="dot" v-if="wave" v-show="dotVisible"></span>
        </transition>
    </button>
</template>
<script>
    import xIcon from '../icon/icon.vue'
    export default {
        name: 'xButton',
        components: { xIcon },
        data() {
            return { dotVisible: false }
        },
        props: {
            icon: { type: String },
            position: {
                type: String,
                default: 'left',
                validator(value) { return value === 'right' || value === 'left' }
            },
            wave: { type: Boolean, default: false }
        },
        methods: {
            onClick(e) {
                this.$emit('click', e);
                if (!this.wave) { return }
                let { top, left, width } = this.$el.getBoundingClientRect();
                let { clientX: x, clientY: y } = e;
                this.$refs.dot.style.top = y - top + 'px';
                this.$refs.dot.style.left = x - left + 'px';
                this.$refs.dot.style.width = width * 5 + 'px';
                this.$refs.dot.style.height = width * 5 + 'px';
                this.$refs.dot.style.margin = `${-width*2.5}px 0 0 ${-width*2.5}px`;
                this.dotVisible = true;
                setTimeout(() => {
                    this.dotVisible = false;
                }, 300);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../color.scss';
    .x-button {
        cursor: pointer;
        font-size: 14px;
        padding: 6px 12px;
        color: $content;
        border-radius: 4px;
        background: $bg;
        border: .5px solid;
        border-color: $border;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        >.x-icon {
            width: 1em;
            height: 1em;
        }
        &:hover {
            border-color: $lp;
        }
        &:focus {
            outline: none;
            border-color: $dp;
            background: $dp;
            color: #fff;
        }
        &.icon-left {
            >.x-icon {
                order: 1;
                margin-right: 0.1em;
            }
            >.slot-content {
                order: 2
            }
        }
        &.icon-right {
            >.x-icon {
                order: 2;
                margin-left: 0.1em;
            }
            >.slot-content {
                order: 1
            }
        }
        &.x-wave {
            background: $lp;
            color: #fff;
            position: relative;
            overflow: hidden;
            &:hover {
                background: $dp;
            }
            >.wave-dot {
                display: inline-block;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
            }
        }
        .wave-enter-active {
            transition: all .3s linear;
        }
        .wave-enter {
            transform: scale(0.1);
            opacity: 1;
        }
        .wave-enter-to {
            transform: scale(1.5);
            opacity: 0;
        }
    }
</style>