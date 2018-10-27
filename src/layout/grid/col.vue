<template>
    <div class="x-col" :class="colClasses" :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'xCol',
        props: {
            mobile: { type: Object },
            ipad: { type: Object },
            npc: { type: Object },
            pc: { type: Object },
            wpc: { type: Object }
        },
        data() {
            return {
                gutter: 0
            }
        },
        created() {},
        methods: {
            getScale(type, obj) {
                let array = Object.entries(obj)[0];
                let span = +array[0];
                let offset = +array[1];
                let visible = '';
                if (span === 0) {
                    visible = `${type}-visible-false`
                } else {
                    visible = `${type}-visible-true`
                }
                return [`${type}-col-${span}`, offset && `${type}-offset-${offset}`, visible];
            }
        },
        computed: {
            colStyle() {
                return {
                    paddingLeft: this.gutter / 2 + 'px',
                    paddingRight: this.gutter / 2 + 'px'
                }
            },
            colClasses() {
                let mobile = [];
                let ipad = [];
                let npc = [];
                let pc = [];
                let wpc = [];
                if (this.mobile) {
                    mobile = this.getScale('mobile', this.mobile);
                }
                if (this.ipad) {
                    ipad = this.getScale('ipad', this.ipad);
                }
                if (this.npc) {
                    npc = this.getScale('npc', this.npc);
                }
                if (this.pc) {
                    pc = this.getScale('pc', this.pc);
                }
                if (this.wpc) {
                    wpc = this.getScale('wpc', this.wpc);
                }
                return [...mobile, ...ipad, ...npc, ...pc, ...wpc];
            }
        }
    }
</script>
<style scoped lang="scss">
    .x-col {
        $class-prefix: mobile-col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: ($n / 24)*100%;
            }
        }
        $class-prefix:mobile-offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: ($n / 24)*100%;
            }
        }
        &.mobile-visible-true {
            display: block;
        }
        &.mobile-visible-false {
            display: none;
        }
        @media (min-width:577px) {
            $class-prefix: ipad-col-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)*100%;
                }
            }
            $class-prefix:ipad-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)*100%;
                }
            }
            &.ipad-visible-true {
                display: block;
            }
            &.ipad-visible-false {
                display: none;
            }
        }
        @media (min-width:769px) {
            $class-prefix: npc-col-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)*100%;
                }
            }
            $class-prefix:npc-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)*100%;
                }
            }
            &.npc-visible-true {
                display: block;
            }
            &.npc-visible-false {
                display: none;
            }
        }
        @media (min-width:993px) {
            $class-prefix: pc-col-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)*100%;
                }
            }
            $class-prefix:pc-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)*100%;
                }
            }
            &.pc-visible-true {
                display: block;
            }
            &.pc-visible-false {
                display: none;
            }
        }
        @media (min-width:1201px) {
            $class-prefix: wpc-col-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)*100%;
                }
            }
            $class-prefix:wpc-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)*100%;
                }
            }
            &.wpc-visible-true {
                display: block;
            }
            &.wpc-visible-false {
                display: none;
            }
        }
    }
</style>