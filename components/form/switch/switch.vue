<template>
    <div class="x-switch">
        <span v-if="falseText" class="switch-left-text">{{falseText}}</span>
        <span ref="core" class="x-switch-core" :value="value" :class="{active:value,['disabled']:disabled}" @click="toggle" :style="coreStyle">
            <span class="x-switch-core-inner" :style="innerStyle"></span>
        </span>
        <span v-if="trueText" class="switch-right-text">{{trueText}}</span>
    </div>
</template>
<script>
    export default {
        name: 'xSwitch',
        props: {
            value: { type: Boolean, default: false, },
            xWidth: { type: String, default: '40px' },
            falseText: { type: String, default: '' },
            trueText: { type: String, default: '' },
            disabled: { type: Boolean, default: false },
            falseColor: { type: String, default: '' },
            trueColor: { type: String, default: '' }
        },
        computed: {
            coreStyle() {
                return `width:${this.xWidth};height:${parseInt(this.xWidth) / 2}px;border-radius:${parseInt(this.xWidth) / 4}px`;
            },
            innerStyle() {
                return `width:${parseInt(this.xWidth)/2-4}px;height:${parseInt(this.xWidth)/2-4}px`;
            }
        },
        methods: {
            toggle() {
                if (this.disabled) { return }
                let newValue = !this.value;
                this.$emit('input', newValue);
                this.$emit('value-change', newValue);
                if (this.trueColor && newValue) {
                    this.$refs.core.style.background = this.trueColor;
                }
                if (this.falseColor && !newValue) {
                    this.$refs.core.style.background = this.falseColor;
                }
            }
        },
        mounted() {
            if (this.trueColor && this.value) {
                this.$refs.core.style.background = this.trueColor;
            }
            if (this.falseColor && !this.value) {
                this.$refs.core.style.background = this.falseColor;
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-switch {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        >.switch-left-text {
            margin-right: 3px;
        }
        >.switch-right-text {
            margin-left: 3px;
        }
        >.x-switch-core {
            display: inline-block;
            background: $error;
            position: relative;
            transition: all .3s linear;
            cursor: pointer;
            >.x-switch-core-inner {
                display: block;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                transition: all .3s linear;
                left: 2px;
                margin-left: 0;
            }
            &.active {
                background: $success;
                >.x-switch-core-inner {
                    margin-left: 50%;
                }
            }
            &.disabled {
                background: #bbb;
            }
        }
    }
</style>