<template>
    <x-spread :visible="visible" horizontal style="flex-shrink:0;">
        <div class="x-sider" v-show="visible">
            <slot></slot>
            <x-icon name="close" class="x-icon" @click="visible=false" v-if="closeButton"></x-icon>
        </div>
    </x-spread>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    import xSpread from '../../others/spread/spread.vue'
    export default {
        name: 'xSider',
        props: { closeButton: { type: Boolean, default: false } },
        components: { xIcon, xSpread },
        data() { return { visible: true } }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-sider {
        position: relative;
        width: 100%;
        height: 100%;
        .x-icon {
            position: absolute;
            top: 4px;
            right: 4px;
            cursor: pointer;
            color: $content;
            width: 12px;
            height: 12px;
            &:hover {
                color: $title;
            }
        }
    }
</style>