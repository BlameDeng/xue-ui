<template>
    <label class="x-option" @click="handleClick">
        <div class="check-box" :class="{checked:current===index}">
            <transition name="fill-fade">
                <span class="fill" v-show="current===index"></span>
            </transition>
        </div>
        <span class="label-text">{{option.label}}</span>
    </label>
</template>
<script>
    export default {
        name: 'xOption',
        props: {
            option: { type: Object, required: true },
            current: Number,
            index: Number
        },
        methods: {
            handleClick() {
                this.$emit('update:current', this.index)
            }
        }
    }
</script>
<style scoped lang="scss">
    $p:#36b1bf;
    .x-option {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding-right: 8px;
        >.check-box {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.15);
            display: flex;
            justify-content: center;
            align-items: center;
            >.fill {
                display: inline-flex;
                width: 8px;
                height: 8px;
                background: $p;
                border-radius: 50%;
            }
            &.checked {
                border-color: $p;
            }
        }
        >.label-text {
            padding: 0 8px;
        }
    }
    .fill-fade-enter-active, .fill-fade-leave-active {
        transition: all .2s cubic-bezier(.78, .14, .15, .86);
    }
    .fill-fade-enter-to, .fill-fade-leave {
        opacity: 1;
        transform: scale(0.85);
    }
    .fill-fade-enter, .fill-fade-leave-to {
        opacity: 0;
        transform: scale(0.05);
    }
</style>