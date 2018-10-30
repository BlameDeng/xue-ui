<template>
    <div class="x-textarea-wrapper">
        <textarea :style="xStyle" :value="value" @change="$emit('change',$event)" @input="onInput" @focus="$emit('focus',$event)" @blur="$emit('blur',$event)" ref="myTextarea">
        </textarea>
    </div>
</template>
<script>
    export default {
        name: 'xTextarea',
        props: {
            value: { type: String },
            resize: { type: Boolean, default: false },
        },
        computed: {
            xStyle() {
                if (this.resize) { return { resize: 'auto' }; } else { return { resize: 'none' }; }
            }
        },
        methods: {
            onInput(e) {
                this.$emit('input', e.target.value);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-textarea-wrapper {
        textarea {
            width: 100%;
            height: 100%;
            resize: none;
            padding: .5em .5em;
            border: 1px solid $border;
            border-radius: 4px;
            color: $main;
            font-size: 14px;
            &:hover {
                border-color: $p;
            }
            &:focus {
                outline: none;
                box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.25);
            }
        }
    }
</style>