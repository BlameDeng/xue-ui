<template>
    <div class="x-cascader">
        <div class="selected" @click="showOptions">
            <p class="value">{{addr}}</p>
            <x-icon name="next" class="x-icon" :class="{active:optionsVisible}" v-show="!selected.length"></x-icon>
            <x-icon name="close" class="x-icon close" v-show="selected.length" @click.stop="clearSelected"></x-icon>
        </div>
        <div class="cascader-options" v-show="optionsVisible">
            <x-cascader-item :source="source" :selected="selected" @update:selected="onUpdate($event)"></x-cascader-item>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import xIcon from '../../basic/icon/icon.vue'
    import xCascaderItem from './cascader-item.vue'
    export default {
        name: 'xCascader',
        components: { xIcon, xCascaderItem },
        props: {
            source: { type: Object },
            selected: { type: Array, default: () => [] },
        },
        provide() {
            return { eventBus: this.eventBus }
        },
        data() { return { optionsVisible: false, eventBus: new Vue() } },
        computed: {
            addr() {
                return this.selected.join(',');
            }
        },
        mounted() {
            this.eventBus.$on('close-options', this.closeOptions);
        },
        methods: {
            onUpdate(obj) {
                let copy = [...this.selected];
                copy[obj.level] = obj.label;
                copy = copy.slice(0, obj.level + 1);
                this.$emit('update:selected', copy);
            },
            showOptions() {
                this.optionsVisible = !this.optionsVisible;
            },
            clearSelected() {
                this.$emit('update:selected', []);
                this.closeOptions();
            },
            closeOptions() {
                this.optionsVisible = false;
            },
            listenDocument(e) {
                if (!this.$el.contains(e.target)) {
                    this.closeOptions();
                }
            }
        },
        watch: {
            optionsVisible(val) {
                if (val) {
                    document.addEventListener('click', this.listenDocument);
                } else {
                    document.removeEventListener('click', this.listenDocument);
                }
            }
        },
        beforeDestroy() {
            this.eventBus.$off('close-options', this.closeOptions);
            document.removeEventListener('click', this.listenDocument);
        }
    };
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-cascader {
        font-size: 14px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        border-radius: 4px;
        color: $content;
        >.selected {
            cursor: pointer;
            position: relative;
            width: 300px;
            >.value {
                height: 30px;
                padding: 5px;
                border: .5px solid $border;
                border-radius: 4px;
                font-size: 14px;
            }
            >.x-icon {
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%) rotateZ(-90deg);
                transition: all .3s;
                width: 12px;
                height: 12px;
                color: $sub;
                &.active {
                    transform: translateY(-50%) rotateZ(90deg);
                    transition: all .3s;
                }
                &.close {
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;
                    &:hover {
                        background: $content;
                        color: #fff;
                    }
                }
            }
        }
        >.cascader-options {
            position: absolute;
            z-index: 10;
            top: 100%;
            margin-top: 10px;
            background: #fff;
            border: 1px solid $border;
            border-radius: 4px;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        }
    }
</style>