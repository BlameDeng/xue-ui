<template>
    <div class="x-collapse">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xCollapse',
        props: {
            selected: { type: Array },
            multiple: { type: Boolean, default: true }
        },
        created() {
            this.$on('click-title', (name) => {
                if (this.multiple) {
                    let array = [...this.selected];
                    let index = array.indexOf(name);
                    if (index === -1) {
                        array.push(name);
                    } else {
                        array.splice(index, 1);
                    }
                    this.$emit('update:selected', array);
                } else {
                    let array = [...this.selected];
                    if (array.indexOf(name) === -1) {
                        array = [name];
                    } else {
                        array = [];
                    }
                    this.$emit('update:selected', array);
                }
            })
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-collapse {
        border: $borderbase;
        border-radius: 4px;
        cursor: pointer;
    }
</style>