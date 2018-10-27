<template>
    <div class="x-nav-item" :class="{active:current===name,vertical}" @click="onClick">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xNavItem',
        props: { name: { type: String, required: true } },
        inject: ['root'],
        computed: {
            current() { return this.root.current; },
            vertical() { return this.root.vertical; }
        },
        methods: {
            onClick() {
                this.root.$emit('click-item', this.name);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-nav-item {
        padding: 5px 20px;
        white-space: nowrap;
        position: relative;
        min-width: 8em;
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
    .x-nav-sub .x-nav-item {
        width: 100%;
        color: $content;
        font-size: 14px;
        padding-left: 25px;
        &.active {
            color: $p;
            &::after {
                display: none;
            }
            background: $bg;
        }
    }
    .x-nav-sub .x-nav-sub .x-nav-item {
        width: 100%;
        color: $sub;
        font-size: 14px;
        padding-left: 25px;
        &.active {
            color: $p;
            &::after {
                display: none;
            }
            background: $bg;
        }
        &.vertical {
            padding-left: 40px;
        }
    }
</style>