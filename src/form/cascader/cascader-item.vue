<template>
    <div class="x-cascader-item">
        <div class="item-wrapper">
            <div v-if="source.children" v-for="item in source.children" :key="item.value" class="x-item">
                <div @click="onClick(item)" class="x-label" :class="{active:selected.indexOf(item.label)>-1}">
                    <span>{{item.label}}</span>
                    <x-icon name="right" class="x-icon" v-if="item.children"></x-icon>
                </div>
            </div>
        </div>
        <div class="children-wrapper" v-if="childrenItem">
            <x-cascader-item class="children-item" :source="childrenItem" :level="level+1" v-if="childrenItem.children&&selected.indexOf(childrenItem.label)>-1" :selected="selected" @update:selected="onUpdate($event)"></x-cascader-item>
        </div>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xCascaderItem',
        components: { xIcon },
        props: {
            source: { type: Object },
            selected: { type: Array, default: () => [] },
            level: { type: Number, default: 0 }
        },
        inject: ['eventBus'],
        data() { return { childrenItem: null } },
        methods: {
            onClick(item) {
                this.childrenItem = item;
                this.$emit('update:selected', { label: item.label, level: this.level });
                if (!this.source.children[0].children) {
                    this.eventBus.$emit('close-options');
                }
            },
            onUpdate(obj) {
                this.$emit('update:selected', obj)
            }
        }
    };
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-cascader-item {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: stretch;
        >.item-wrapper {
            height: 100%;
            >.x-item {
                width: 100px;
                >.x-label {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: .1em .2em;
                    >span {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    >.x-icon {
                        margin-left: auto;
                        flex-shrink: 0;
                        color: $sub;
                    }
                    &.active {
                        background: $bg;
                        color: $dp;
                    }
                    &:hover {
                        background: $bg;
                    }
                }
            }
        }
        >.children-wrapper {
            height: 100%;
            flex-grow: 1;
        }
    }
</style>