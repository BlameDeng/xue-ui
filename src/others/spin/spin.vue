<template>
    <div class="x-spin">
        <div class="top"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="fill"></div>
    </div>
</template>
<script>
    export default {
        name: 'xSpin',
        data() {
            return {}
        },
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-spin {
        width: 230px;
        height: 230px;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        >.top {
            width: 4%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 48%;
            background: $p;
            animation: spin 1.6s linear infinite;
        }
        >.left {
            width: 50%;
            height: 100%;
            background: linear-gradient(to bottom, $p, #fff);
            animation: spin 1.6s linear infinite;
            transform-origin: right center;
            box-shadow: 2px 0 2px -2px $p;
        }
        >.right {
            width: 50%;
            height: 100%;
            background: $p;
            animation: spin 1.6s linear infinite;
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
    @keyframes spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>