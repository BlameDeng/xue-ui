<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-show="visible" :class="{[`${position}`]:true}">
            <slot name="content"></slot>
        </div>
        <span ref="trigger">
            <slot></slot>
        </span>
    </div>
</template>
<script>
    export default {
        name: 'xPopover',
        props: {
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'right', 'left', 'bottom'].indexOf(value) >= 0;
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value) {
                    return ['click', 'hover'].indexOf(value) >= 0;
                }
            }
        },
        data() { return { visible: false } },
        computed: {
            openEvent() {
                if (this.trigger === 'click') {
                    return 'click';
                } else {
                    return 'mouseenter';
                }
            },
            closeEvent() {
                if (this.trigger === 'click') {
                    return 'click';
                } else {
                    return 'mouseleave';
                }
            }
        },
        methods: {
            positionContent() {
                let content = this.$refs.contentWrapper;
                document.body.appendChild(content);
                let { top, left, bottom, right } = this.$refs.trigger.getBoundingClientRect();
                let width = right - left;
                let height = bottom - top;
                if (this.position === 'top') {
                    content.style.top = `${top+window.scrollY}px`;
                    content.style.left = `${left+window.scrollX}px`;
                } else if (this.position === 'bottom') {
                    content.style.top = `${top+height+window.scrollY}px`;
                    content.style.left = `${left+window.scrollX}px`;
                } else if (this.position === 'left') {
                    content.style.top = `${top+height/2+window.scrollY}px`;
                    content.style.left = `${left+window.scrollX}px`;
                } else if (this.position === 'right') {
                    content.style.top = `${top+height/2+window.scrollY}px`;
                    content.style.left = `${left+width+window.scrollX}px`;
                }
            },
            onClickDocument(e) {
                if (this.$refs.popover === e.target || this.$refs.popover.contains(e.target)) {
                    return
                } else if (
                    this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))
                ) { return }
                this.close();
            },
            open() {
                this.visible = true;
                this.$nextTick(() => {
                    this.positionContent();
                    document.addEventListener('click', this.onClickDocument);
                })
            },
            onClick(e) {
                if (this.$refs.trigger.contains(e.target)) {
                    if (this.visible === true) {
                        this.close();
                    } else { this.open(); }
                }
            },
            close() {
                this.visible = false;
                document.removeEventListener('click', this.onClickDocument);
            }
        },
        mounted() {
            let popover = this.$refs.popover;
            if (this.trigger === 'click') {
                popover.addEventListener('click', this.onClick);
            } else {
                popover.addEventListener('mouseenter', this.open);
                popover.addEventListener('mouseleave', this.close);
            }
        },
        beforeDestroy() {
            let popover = this.$refs.popover;
            if (this.trigger === 'click') {
                popover.removeEventListener('click', this.onClick);
            } else {
                popover.removeEventListener('mouseenter', this.open);
                popover.removeEventListener('mouseleave', this.close);
            }
        },
    }
</script>
<style scoped lang="scss">
    @import '../../basic/color.scss';
    .popover {
        display: inline-block;
        vertical-align: top;
        >span {
            display: inline-block;
            vertical-align: top;
        }
    }
    .content-wrapper {
        border: .5px solid $border;
        border-radius: 4px;
        background: #fff;
        padding: .5em 1em;
        max-width: 20em;
        word-break: break-all;
        position: absolute;
        z-index: 25;
        &::before, &::after {
            content: '';
            display: block;
            height: 0;
            width: 0;
            border: 10px solid transparent;
            position: absolute;
        }
        &.top {
            transform: translateY(-100%);
            margin-top: -10px;
            &::before {
                top: 100%;
                border-bottom: none;
                border-top-color: $border;
                left: 10px;
            }
            &::after {
                top: calc(100% - 1px);
                border-bottom: none;
                border-top-color: #fff;
                left: 10px;
            }
        }
        &.bottom {
            margin-top: 10px;
            &::before {
                bottom: 100%;
                border-top: none;
                border-bottom-color: $border;
                left: 10px;
            }
            &::after {
                bottom: calc(100% - 1px);
                border-top: none;
                border-bottom-color: #fff;
                left: 10px;
            }
        }
        &.left {
            transform: translateX(-100%) translateY(-50%);
            margin-left: -10px;
            &::before {
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                border-right: none;
                border-left-color: $border;
            }
            &::after {
                left: calc(100% - 1px);
                top: 50%;
                transform: translateY(-50%);
                border-right: none;
                border-left-color: #fff;
            }
        }
        &.right {
            margin-left: 10px;
            transform: translateY(-50%);
            &::before {
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                border-left: none;
                border-right-color: $border;
            }
            &::after {
                right: calc(100% - 1px);
                top: 50%;
                transform: translateY(-50%);
                border-left: none;
                border-right-color: #fff;
            }
        }
    }
</style>