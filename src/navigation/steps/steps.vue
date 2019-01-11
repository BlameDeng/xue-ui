<template>
    <div class="x-steps" :class="{vertical}">
        <x-step v-for="(step,index) in steps" :key="index" :index="index" :current="current" :step="step" :error="error"></x-step>
    </div>
</template>
<script>
    import xStep from './step.vue'
    export default {
        name: 'xSteps',
        mixins: [],
        components: { xStep },
        props: {
            steps: { type: Array, required: true },
            current: { type: Number, default: 0 },
            vertical: { type: Boolean, default: false },
            error: { type: Boolean, default: false }
        },
        data() {
            return {}
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {}
    }
</script>
<style scoped lang="scss">
    .x-steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &.vertical {
            flex-direction: column;
        }
    }
</style>