<template>
    <div class="x-collapse-item">
        <div class="title" @click="onClick" :class="{selected:selected.indexOf(name)>=0}">
            <x-icon name="right" class="x-icon"></x-icon>
            <slot name="title"></slot>
        </div>
        <x-spread :visible="selected.indexOf(name)>=0">
            <div class="collapse-content">
                <slot></slot>
            </div>
        </x-spread>
    </div>
</template>
<script>
    import xSpread from '../../others/spread/spread.vue'
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xCollapseItem',
        components: { xSpread, xIcon },
        props: {
            name: { type: String, required: true }
        },
        computed: {
            selected() {
                return this.$parent.selected;
            }
        },
        methods: {
            onClick() {
                this.$parent.$emit('click-title', this.name);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-collapse-item {
        &:first-child {
            >.title {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
        }
        &:last-child {
            >.title:last-child {
                border-bottom: none;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
        >.title {
            border: $borderbase;
            border-bottom: none;
            margin: -1px -1px 0;
            padding: 4px 0 4px 8px;
            background: $bg;
            color: $title;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            user-select: none;
            >.x-icon {
                margin-right: 15px;
                width: 10px;
                height: 10px;
                transition: transform .3s;
            }
            &.selected {
                >.x-icon {
                    transform: rotateZ(90deg);
                }
            }
        }
        .collapse-content {
            font-size: 14px;
            padding: 4px 0 4px 8px;
            text-indent: 2em;
            color: $main;
        }
    }
</style>