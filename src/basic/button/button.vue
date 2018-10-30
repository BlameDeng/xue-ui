<template>
    <button type="button" class="x-button" :class="{[`icon-${position}`]:true,wave,primary}" @click="onClick">
        <x-icon v-if="icon" :name="icon" class="x-icon"></x-icon>
        <span class="slot-content">
            <slot></slot>
        </span>
    </button>
</template>
<script>
    import xIcon from '../icon/icon.vue'
    export default {
        name: 'xButton',
        components: { xIcon },
        data() {
            return { dotVisible: false, wave: false, timerId: null }
        },
        props: {
            icon: { type: String },
            position: {
                type: String,
                default: 'left',
                validator(value) { return value === 'right' || value === 'left' }
            },
            primary: { type: Boolean, default: false }
        },
        methods: {
            onClick(e) {
                this.$emit('click', e);
                this.wave = true
                this.$el.addEventListener('animationend', this.listenAnimation)
            },
            listenAnimation() {
                this.wave = false
                this.$el.removeEventListener('animationend', this.listenAnimation)
            }
        },
        beforeDestroy() {
            this.$el.removeEventListener('animationend', this.listenAnimation)
        }
    }
</script>
<style scoped lang="scss">
    @import '../color.scss';
    .x-button {
        cursor: pointer;
        font-size: 14px;
        line-height: 22px;
        height: 32px;
        padding: 0 12px;
        color: $main;
        border-radius: 4px;
        background: $bg;
        border: 1px solid;
        border-color: $border;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        position: relative;
        >.x-icon {
            width: 1em;
            height: 1em;
        }
        &:hover {
            color: $p;
            border-color: $p;
        }
        &:focus {
            outline: none;
            border-color: $p;
            color: $p;
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
        &::after {
            display: none;
        }
        &.wave {
            &::after {
                content: '';
                display: block;
                background: $habg;
                pointer-events: none;
                position: absolute;
                top: -1px;
                left: -1px;
                bottom: -1px;
                right: -1px;
                border-radius: inherit;
                border: 0 solid $p;
                opacity: .4;
                animation: button-scale .5s linear forwards;
                flex-shrink: 0;
            }
        }
        &.primary {
            background: $p;
            color: #fff;
            border-color: $p;
        }
    }
    @keyframes button-scale {
        to {
            top: -6px;
            left: -6px;
            bottom: -6px;
            right: -6px;
            border-width: 6px;
            opacity: 0;
        }
    }
</style>