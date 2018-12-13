<template>
    <div class="x-time-picker">
        <div class="input-wrapper">
            <input type="text" v-model.trim="value" @click="pickerVisible = true" ref="input" @focus="inputFocus">
            <label class="label" v-if="!value">请选择时间</label>
            <x-icon name="time" class="icon" style="pointer-events:none;"></x-icon>
            <x-icon name="error" class="icon clear" v-if="value" @click="clearValue" style="color:rgba(0,0,0,0.35);"></x-icon>
        </div>
        <x-spread :visible="pickerVisible" :duration="200" class="spread">
            <div class="picker" ref="picker">
                <input type="text" :value="value" @focus="pickerHolderVisible=false" @blur="pickerHolderVisible=true" @input="input">
                <x-icon name="error" class="icon clear" v-if="value" @click="clearValue" style="color:rgba(0,0,0,0.35);"></x-icon>
                <label class="label" v-if="!value&&pickerHolderVisible">请选择时间</label>
                <div class="picker-items">
                    <div class="item" ref="hour">
                        <ul class="hour">
                            <li v-for="(n,index) in 24" :key="n" @click=" handleClick(index,'hour')" :class="{selected:hour===index}">{{index>9?index:'0'+index}}</li>
                        </ul>
                    </div>
                    <div class="item" ref="minute">
                        <ul class="minute">
                            <li v-for="(n,index) in 60" :key="n" @click=" handleClick(index,'minute')" :class="{selected:minute===index}">{{index>9?index:'0'+index}}</li>
                        </ul>
                    </div>
                    <div class="item" ref="second">
                        <ul class="second">
                            <li v-for="(n,index) in 60" :key="n" @click=" handleClick(index,'second')" :class="{selected:second===index}">{{index>9?index:'0'+index}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </x-spread>
    </div>
</template>
<script>
    import xIcon from '../../basic/icon/icon.vue'
    import xSpread from '../../others/spread/spread.vue'
    import tweenScroll from '../../others/tween/tweenScroll.js'
    export default {
        name: 'xTimePicker',
        components: { xIcon, xSpread },
        props: {
            defaultValue: {
                type: String,
                validator(val) {
                    const pattern = /^([\d]{2}):([\d]{2}):([\d]{2})$/
                    if (pattern.test(val)) {
                        let hour = +RegExp.$1
                        let minute = +RegExp.$2
                        let second = +RegExp.$3
                        return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59
                    }
                    return false
                }
            }
        },
        data() {
            return {
                pickerHolderVisible: true,
                pickerVisible: false,
                hour: -1,
                minute: -1,
                second: -1,
                timerId: null
            }
        },
        computed: {
            value() {
                if (this.hour >= 0 && this.minute >= 0 && this.second >= 0) {
                    return `${this.hour>9?this.hour:'0'+this.hour}:${this.minute>9?this.minute:'0'+this.minute}:${this.second>9?this.second:'0'+this.second}`
                } else {
                    return ''
                }
            }
        },
        watch: {
            pickerVisible(val) {
                if (val) {
                    document.addEventListener('click', this.listenDocument)
                    if (!this.value) {
                        ['hour', 'minute', 'second'].forEach(key => {
                            this.$nextTick(() => {
                                this.$refs[key].scrollTop = 0
                            })
                        })
                    }
                    if (this.defaultValue && this.defaultValue === this.value) {
                        const pattern = /^([\d]{2}):([\d]{2}):([\d]{2})$/
                        if (pattern.test(this.defaultValue)) {
                            this.hour = +RegExp.$1
                            this.minute = +RegExp.$2
                            this.second = +RegExp.$3
                            this.$nextTick(() => {
                                ['hour', 'minute', 'second'].forEach(key => {
                                    this.$refs[key].scrollTop = this[key] * 32
                                })
                            })
                        }
                    }
                } else {
                    document.removeEventListener('click', this.listenDocument)
                }
            },
            hour(val) {
                if (val >= 0) {
                    this.scroll('hour', val * 32)
                }

            },
            minute(val) {
                if (val >= 0) {
                    this.scroll('minute', val * 32)
                }

            },
            second(val) {
                if (val >= 0) {
                    this.scroll('second', val * 32)
                }
            },
            value(val) {
                this.$emit('input', val)
            }
        },
        created() {},
        mounted() {
            if (this.defaultValue) {
                const pattern = /^([\d]{2}):([\d]{2}):([\d]{2})$/
                if (pattern.test(this.defaultValue)) {
                    this.hour = +RegExp.$1
                    this.minute = +RegExp.$2
                    this.second = +RegExp.$3
                    this.$nextTick(() => {
                        ['hour', 'minute', 'second'].forEach(key => {
                            this.$refs[key].scrollTop = this[key] * 32
                        })
                    })
                }
            }
        },
        beforeDestroy() {
            document.removeEventListener('click', this.listenDocument)
        },
        methods: {
            inputFocus(e) { e.target.blur() },
            listenDocument(e) {
                if (!this.$refs.picker.contains(e.target)) {
                    //点击别处关闭且无value，将数据初始化
                    if (!this.value) {
                        this.hour = -1
                        this.minute = -1
                        this.second = -1
                    }
                    this.pickerVisible = false
                }
            },
            scroll(key, target) {
                tweenScroll(this.$refs[key], { x: 0, y: target }, 200)
            },
            clearValue() {
                this.hour = -1
                this.minute = -1
                this.second = -1
            },
            handleClick(index, key) {
                ['hour', 'minute', 'second'].forEach(item => {
                    if (item === key) {
                        this[key] = index
                    } else {
                        this[item] = this[item] === -1 ? 0 : this[item]
                    }
                })
            },
            input(e) {
                let val = e.target.value
                if (val.length < 8) { return }
                const pattern = /^([\d]{2}):([\d]{2}):([\d]{2})$/
                if (pattern.test(val)) {
                    let hour = +RegExp.$1
                    let minute = +RegExp.$2
                    let second = +RegExp.$3
                    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59) {
                        this.hour = hour
                        this.minute = minute
                        this.second = second
                    } else {
                        e.target.value = this.value
                    }
                } else {
                    e.target.value = this.value
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    $p: #36b1bf;
    .x-time-picker {
        width: 180px;
        position: relative;
        >.input-wrapper {
            width: 140px;
            position: relative;
            >input {
                width: 100%;
                height: 32px;
                display: block;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 2px;
                box-shadow: none;
                padding: 0 5px 0 5px;
                color: rgba(0, 0, 0, 0.65);
                &:focus {
                    outline: none;
                    border-color: $p;
                }
                &:hover {
                    border-color: $p;
                }
            }
            >.label {
                display: block;
                width: 100%;
                height: 32px;
                line-height: 32px;
                padding: 0 5px 0 5px;
                color: rgba(0, 0, 0, 0.45);
                position: absolute;
                top: 0;
                left: 0;
                pointer-events: none;
            }
            >.icon {
                width: 20px;
                height: 20px;
                position: absolute;
                top: 50%;
                right: 5px;
                transform: translateY(-50%);
                cursor: pointer;
                &.clear {
                    opacity: 0;
                    background: #fff;
                    transition: all 0.2s linear;
                }
            }
            &:hover {
                >.icon {
                    &.clear {
                        opacity: 1;
                    }
                }
            }
        }
        >.spread {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            .picker {
                width: 100%;
                height: 195px;
                background: #fff;
                color: rgba(0, 0, 0, 0.65);
                position: relative;
                >input {
                    width: 100%;
                    height: 35px;
                    display: block;
                    border: none;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
                    box-shadow: none;
                    padding: 0 5px 0 5px;
                    color: rgba(0, 0, 0, 0.65);
                    &:focus {
                        outline: none;
                    }
                }
                >.clear {
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    top: 17px;
                    right: 5px;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
                >.label {
                    display: block;
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    padding: 0 5px 0 5px;
                    color: rgba(0, 0, 0, 0.45);
                    position: absolute;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }
                >.picker-items {
                    width: 180px;
                    height: 160px;
                    display: flex;
                    justify-content: flex-start;
                    >.item {
                        width: 60px;
                        height: 160px;
                        overflow-x: hidden;
                        overflow-y: hidden;
                        &:hover {
                            overflow-y: scroll;
                        }
                        >ul {
                            width: 100%;
                            padding-bottom: 128px;
                            border-left: 1px solid rgba(0, 0, 0, 0.15);
                            &.hour {
                                border-left: none;
                            }
                            >li {
                                padding: 5px 0 5px 15px;
                                cursor: pointer;
                                user-select: none;
                                &:hover {
                                    background: #f0fffe;
                                }
                                &.selected {
                                    background: #f5f5f5;
                                    font-weight: 600;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>