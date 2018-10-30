<template>
    <ul class="x-pager" v-show="!singleHide||total!==1" :class="{simple}">
        <li class="num" :class="{disabled:current===1}" @click="onSkip(-1)">
            <x-icon name="left"></x-icon>
        </li>
        <li v-for="(page,index) in pages" :key="index" class="num" :class="{active:page===current,seprator:page==='...'}" @click="onClickPage(page)">
            <template v-if="page==='...'">
                <x-icon name="dot"></x-icon>
            </template>
            <template v-else>
                {{page}}
            </template>
        </li>
        <li class="num" :class="{disabled:current===total}" @click="onSkip(1)">
            <x-icon name="right"></x-icon>
        </li>
    </ul>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    export default {
        name: 'xPager',
        components: { xIcon },
        props: {
            total: { type: Number, required: true },
            current: { type: Number, required: true },
            singleHide: { type: Boolean, default: true },
            simple: { type: Boolean, default: false }
        },
        computed: {
            pages() {
                let array = [1, this.total, this.current, this.current - 1, this.current - 2, this.current + 1, this.current + 2];
                if (this.current <= 4) {
                    array = [1, 2, 3, 4, 5, 6, 7, this.current + 1, this.current + 2, this.total];
                }
                if (this.current >= this.total - 3) {
                    array = [1, this.total, this.current, this.total - 1, this.total - 2, this.total - 3, this.total - 4, this.total - 5, this.total - 6];
                }
                array = this.unique(array.sort((a, b) => a - b));
                let pages = array.reduce((prev, current, index, array) => {
                    prev.push(current);
                    let length = prev.length;
                    if (prev[length - 2] && current - prev[length - 2] > 1) {
                        prev.splice(prev.length - 1, 0, '...');
                    }
                    return prev;
                }, []);
                return pages = pages.filter(n => (n >= 1 && n <= this.total) || n === '...');
            }
        },
        methods: {
            unique(array) {
                let temp = {};
                let newArray = [];
                array.forEach(n => {
                    if (!temp[n]) {
                        temp[n] = 1;
                        newArray.push(n);
                    }
                })
                return newArray;
            },
            onClickPage(page) {
                page !== '...' ? this.$emit('update:current', page) : '';
            },
            onSkip(num) {
                num === -1 && this.current > 1 ? this.$emit('update:current', this.current - 1) : '';
                num === 1 && this.current < this.total ? this.$emit('update:current', this.current + 1) : '';
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-pager {
        font-size: 14px;
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        line-height: 30px;
        user-select: none;
        height: 30px;
        >.num {
            min-width: 35px;
            height: 100%;
            background: $bg;
            cursor: pointer;
            padding: 2px 0;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:not(:first-child) {
                margin-left: 4px;
            }
            &:hover:not(.seprator) {
                color: $p;
            }
            &.active {
                background: $p;
                color: #fff;
                cursor: default;
                &:hover {
                    color: #fff;
                }
            }
            &.seprator {
                cursor: default;
            }
            &.disabled {
                color: $disabled;
                cursor: default;
                &:hover {
                    color: $disabled;
                }
            }
        }
        &.simple {
            >.num {
                background: none;
                color: $main;
                &:hover:not(.seprator) {
                    color: $p;
                }
                &.active {
                    color: $p;
                    cursor: default;
                }
                &.disabled {
                    color: $disabled;
                    cursor: default;
                    &:hover {
                        color: $disabled;
                    }
                }
            }
        }
    }
</style>