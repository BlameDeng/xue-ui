<template>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
        <div class="x-spread" v-show="visible">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'xSpread',
        props: {
            visible: { type: Boolean, required: true },
            horizontal: { type: Boolean, default: false },
            duration: { type: [Number, String], default: 300 }
        },
        data() {
            return {
                dataset: {
                    oldPaddingTop: '',
                    oldPaddingBottom: '',
                    oldPaddingLeft: '',
                    oldPaddingRight: '',
                    oldOverflow: ''
                }
            }
        },
        computed: {
            verticalTransition() {
                return `${+this.duration}ms height ease-in-out, ${+this.duration}ms padding-top ease-in-out, ${+this.duration}ms padding-bottom ease-in-out`;
            },
            horizontalTransition() {
                return `${+this.duration}ms width ease-in-out, ${+this.duration}ms padding-left ease-in-out, ${+this.duration}ms padding-right ease-in-out`;
            }
        },
        methods: {
            beforeEnter(el) {
                if (this.horizontal) {
                    el.style.transition = this.horizontalTransition;
                    this.dataset.oldPaddingLeft = el.style.paddingLeft;
                    this.dataset.oldPaddingRight = el.style.paddingRight;
                    el.style.width = 0;
                    el.style.paddingLeft = 0;
                    el.style.paddingRight = 0;
                } else {
                    el.style.transition = this.verticalTransition;
                    this.dataset.oldPaddingTop = el.style.paddingTop;
                    this.dataset.oldPaddingBottom = el.style.paddingBottom;
                    el.style.height = 0;
                    el.style.paddingTop = 0;
                    el.style.paddingBottom = 0;
                }
            },
            enter(el) {
                this.dataset.oldOverflow = el.style.overflow;
                if (this.horizontal) {
                    if (el.scrollWidth !== 0) {
                        el.style.width = el.scrollWidth + 'px';
                    } else {
                        el.style.width = '';
                    }
                    el.style.paddingLeft = this.dataset.oldPaddingLeft;
                    el.style.paddingRight = this.dataset.oldPaddingRight;
                } else {
                    if (el.scrollHeight !== 0) {
                        el.style.height = el.scrollHeight + 'px';
                    } else {
                        el.style.height = '';
                    }
                    el.style.paddingTop = this.dataset.oldPaddingTop;
                    el.style.paddingBottom = this.dataset.oldPaddingBottom;
                }
                el.style.overflow = 'hidden';
            },
            afterEnter(el) {
                el.style.transition = '';
                el.style.overflow = this.dataset.oldOverflow;
                this.horizontal ? el.style.width = '' : el.style.height = '';
            },
            beforeLeave(el) {
                this.dataset.oldOverflow = el.style.overflow;
                if (this.horizontal) {
                    this.dataset.oldPaddingLeft = el.style.paddingLeft;
                    this.dataset.oldPaddingRight = el.style.paddingRight;
                    el.style.width = el.scrollWidth + 'px';
                } else {
                    this.dataset.oldPaddingTop = el.style.paddingTop;
                    this.dataset.oldPaddingBottom = el.style.paddingBottom;
                    el.style.height = el.scrollHeight + 'px';
                }
                el.style.overflow = 'hidden';
            },
            leave(el) {
                if (this.horizontal) {
                    if (el.scrollWidth !== 0) {
                        el.style.transition = this.horizontalTransition;
                        el.style.width = 0;
                        el.style.paddingLeft = 0;
                        el.style.paddingRight = 0;
                    }
                } else {
                    if (el.scrollHeight !== 0) {
                        el.style.transition = this.verticalTransition;
                        el.style.height = 0;
                        el.style.paddingTop = 0;
                        el.style.paddingBottom = 0;
                    }
                }
            },
            afterLeave(el) {
                el.style.transition = '';
                el.style.overflow = this.dataset.oldOverflow;
                if (this.horizontal) {
                    el.style.width = '';
                    el.style.paddingLeft = this.dataset.oldPaddingLeft;
                    el.style.paddingRight = this.dataset.oldPaddingRight;
                } else {
                    el.style.height = '';
                    el.style.paddingTop = this.dataset.oldPaddingTop;
                    el.style.paddingBottom = this.dataset.oldPaddingBottom;
                }
            }
        }
    }
</script>