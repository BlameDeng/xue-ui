<template>
    <div class="x-radio" :class="{vertical}">
        <x-option v-for="(option,index) in options" :key="option.value" :option="option" :index="index" :current.sync="current"></x-option>
    </div>
</template>
<script>
    import xOption from './option.vue'
    export default {
        name: "xRadio",
        components: { xOption },
        props: {
            options: { type: Array, required: true },
            vertical: { type: Boolean, default: false },
            defaultIndex: Number
        },
        data() {
            return {
                current: -1
            }
        },
        watch: {
            current(val) {
                if (val > -1) {
                    this.$emit('value-change', this.options[val].value)
                }
            }
        },
        created() {
            this.defaultIndex || this.defaultIndex === 0 ? this.current = this.defaultIndex : ''
        }
    }
</script>
<style scoped lang="scss">
    .x-radio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &.vertical {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>