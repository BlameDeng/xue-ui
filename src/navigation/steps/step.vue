<template>
    <div class="x-step" :class="{index:index===0}">
        <div class="line" v-if="index!==0"></div>
        <div class="step-tag">
            <x-icon name="check" v-if="index<current"></x-icon>
            <span v-if="index>=current">{{index}}</span>
            <x-icon name="close" v-if="error&&current===index"></x-icon>
        </div>
        <div class="content">
            <div class="title">{{step.title}}</div>
            <div class="description">{{step.description}}</div>
        </div>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xStep',
        mixins: [],
        components: { xIcon },
        props: {
            step: { type: Object, required: true },
            index: Number,
            current:Number,
            error: Boolean
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
    $p:#36b1bf;
    $error:#f5222d;
    .x-step {
        flex-grow: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &.index {
            flex-grow: 0;
        }
        >.line {
            flex-grow: 1;
            height: 1px;
            background: $p;
            margin: 0 5px;
        }
        >.step-tag {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.15);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 8px;
        }
        >.content {
            >.title {
                cursor: default;
                font-size: 14px;
            }
            >.description {
                cursor: default;
                font-size: 12px;
            }
        }
    }
</style>