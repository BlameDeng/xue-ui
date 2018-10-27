<template>
    <div class="x-input-wrapper" :class="{error:error}">
        <input :value="value" :disabled="disabled" :readOnly="readOnly" @change="$emit('change',$event)" @input="$emit('input',$event.target.value)" @focus="$emit('focus',$event)" @blur="$emit('blur',$event)" :placeholder="placeholder" ref="myXInput">
        <template v-if="error">
            <p class="error-info">
                <x-icon name="error" class="x-icon"></x-icon>
                <span>{{error}}</span>
            </p>
        </template>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xInput',
        components: { xIcon },
        props: {
            value: { type: String },
            disabled: { type: Boolean, default: false },
            readOnly: { type: Boolean, default: false },
            error: { type: String },
            autoFocus: { type: Boolean, default: false },
            placeholder: { type: String }
        },
        mounted() {
            if (this.autoFocus) {
                this.$refs.myXInput.focus();
            }
        }
    };
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-input-wrapper {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        position: relative;
        >input {
            height: 100%;
            width: 100%;
            padding: 0.5em 0.5em;
            font-size: inherit;
            border: .5px solid $border;
            border-radius: 4px;
            background: none;
            &:hover {
                border-color: $lp;
            }
            &:focus {
                outline: none;
                box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.05);
            }
            &[disabled],
            &[readonly] {
                border-color: #bbb;
                color: #bbb;
                cursor: not-allowed;
            }
        }
        &.error {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            >input {
                border-color: $error;
            }
            >.error-info {
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                color: $error;
                width: 100%;
            }
        }
    }
</style>