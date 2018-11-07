<template>
    <div class="x-table">
        <table class="table" :class="{border,compact,striped}">
            <thead>
                <tr>
                    <th v-if="number" class="number">#</th>
                    <th class="checkbox">
                        <div class="input-wrapper" @click="clickAll" :class="{checked:selectAll,indeterminate:!selectAll&&selectedItems.length}">
                            <input class="input" type="checkbox">
                        </div>
                    </th>
                    <th v-for="(col,index) in columns" :key="index">
                        <span :class="{sort}">{{col.title}}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(source,index) in dataSource" :key="source.id">
                    <td v-if="number">{{index+1}}</td>
                    <td class="checkbox">
                        <div class="input-wrapper" :class="{checked:selectedItems.filter(item=>item.id===source.id).length}" @click="clickItem(source,index)">
                            <input class="input" type="checkbox">
                        </div>
                    </td>
                    <td v-for="(col,index) in columns" :key="index">{{source[col.filed]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: 'xTable',
        components: {},
        props: {
            columns: { type: Array, required: true },
            dataSource: { type: Array, required: true },
            selectedItems: { type: Array, required: true },
            number: { type: Boolean, default: false },
            border: { type: Boolean, default: false },
            compact: { type: Boolean, default: false },
            striped: { type: Boolean, default: false }
        },
        data() {
            return {}
        },
        computed: {
            selectAll() {
                const sourceId = this.dataSource.map(item => item.id).sort()
                const selectedId = this.selectedItems.map(item => item.id).sort()
                if (sourceId.length !== selectedId.length) {
                    return false
                }
                let result = true
                for (let i = 0; i < sourceId.length; i++) {
                    if (sourceId[i] !== selectedId[i]) {
                        result = false
                        break
                    }
                }
                return result
            }
        },
        methods: {
            clickItem(source, index) {
                let copy = JSON.parse(JSON.stringify(this.selectedItems))
                if (this.isInSelectedItems(source)) {
                    copy = copy.filter(item => item.id !== source.id)
                } else {
                    copy.push(source)
                }
                this.$emit('update:selectedItems', copy)
            },
            clickAll() {
                if (this.dataSource.length === this.selectedItems.length) {
                    this.$emit('update:selectedItems', [])
                } else {
                    this.$emit('update:selectedItems', this.dataSource)
                }
            },
            isInSelectedItems(source) {
                return this.selectedItems.filter(item => item.id === source.id).length
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .x-table {
        >.table {
            width: 100%;
            border-collapse: collapse;
            cursor: default;
            th {
                font-weight: 600;
                >.sort {
                    font-weight: inherit;
                    position: relative;
                    border: 1px solid red;
                    padding-right: 15px;
                    &::before, &::after {
                        position: absolute;
                        right: 0;
                        content: '';
                        display: block;
                        border: 6px solid transparent;
                    }
                    &::before {
                        top: 0;
                        border-bottom-color: $p;transform: translateY(-5px);
                    }
                    ;
                    &::after {
                        bottom: 0;
                        border-top-color: $p;transform: translateY(5px);
                    }
                }
            }
            th,
            td {
                border-bottom: $borderbase;
                text-align: left;
                padding: 8px;
                &.checkbox {
                    .input-wrapper {
                        width: 14px;
                        height: 14px;
                        border: $borderbase;
                        border-radius: 4px;
                        margin: 0 auto;
                        cursor: pointer;
                        transition: all 0.1s linear;
                        background: #fff;
                        .input {
                            width: 14px;
                            height: 14px;
                            opacity: 0;
                            pointer-events: none;
                        }
                        &:hover {
                            border-color: $hover;
                        }
                        &.checked {
                            background: $p;
                            border-color: $p;
                            position: relative;
                            &::after {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-65%) rotateZ(-45deg);
                                content: '';
                                display: block;
                                width: 9px;
                                height: 5px;
                                border-left: 2px solid #fff;
                                border-bottom: 2px solid #fff;
                            }
                        }
                        &.indeterminate {
                            background: $p;
                            border-color: $p;
                            position: relative;
                            &::after {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                                content: '';
                                display: block;
                                width: 9px;
                                height: 3px;
                                background: #fff;
                                border-radius: 1px;
                            }
                        }
                    }
                }
            }
            >tbody {
                >tr {
                    &:hover {
                        background: $habg;
                    }
                }
            }
            &.border {
                th,
                td {
                    border: $borderbase;
                }
            }
            &.compact {
                th,
                td {
                    padding: 4px;
                }
            }
            &.striped {
                >tbody {
                    >tr {
                        &:nth-child(even) {
                            background: $bg;
                        }
                        &:hover {
                            background: $habg;
                        }
                    }
                }
            }
        }
    }
</style>