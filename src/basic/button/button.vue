<template>
    <button type="button" class="x-button" :class="{[`icon-${position}`]:true,wave,primary,normal}" @click="onClick">
        <x-icon v-if="icon&&!slefLoading" :name="icon" class="x-icon"></x-icon>
        <x-icon name="loading" v-show="loading&&slefLoading" class="x-icon loading"> </x-icon>
        <span class="slot-content">
            <slot></slot>
        </span>
    </button>
</template>
<script>
import xIcon from '../icon/icon.vue'
export default {
  name: 'xButton',
  components: { xIcon },
  data() {
    return { dotVisible: false, wave: false, slefLoading: false }
  },
  props: {
    icon: String,
    position: {
      type: String,
      default: 'left',
      validator(value) {
        return value === 'right' || value === 'left'
      }
    },
    primary: { type: Boolean, default: false },
    normal: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  mounted() {
    this.$el.addEventListener('animationend', this.listenAnimation)
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
      if (this.loading) {
        this.slefLoading = !this.slefLoading
      }
      this.wave = true
    },
    listenAnimation() {
      this.wave = false
    },
    stopLoading() {
      this.slefLoading = false
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('animationend', this.listenAnimation)
  }
}
</script>
<style scoped lang="scss">
@import '../color.scss';
.x-button {
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
  height: 32px;
  padding: 0 12px;
  color: $main;
  border-radius: 4px;
  background: #fff;
  border: 1px solid;
  border-color: $border;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  position: relative;
  > .x-icon {
    width: 1em;
    height: 1em;
    &.loading {
      animation: loading-spin 1.3s linear infinite;
    }
  }
  &:hover {
    color: $p;
    border-color: $p;
  }
  &:focus {
    outline: none;
    border-color: $p;
    color: $p;
  }
  &.icon-left {
    > .x-icon {
      order: 1;
      margin-right: 0.1em;
    }
    > .slot-content {
      order: 2;
    }
  }
  &.icon-right {
    > .x-icon {
      order: 2;
      margin-left: 0.1em;
    }
    > .slot-content {
      order: 1;
    }
  }
  &::after {
    display: none;
  }
  &.wave {
    &::after {
      content: '';
      display: block;
      background: $habg;
      pointer-events: none;
      position: absolute;
      z-index: 1;
      top: -1px;
      left: -1px;
      bottom: -1px;
      right: -1px;
      border-radius: inherit;
      border: 0 solid $p;
      opacity: 0.4;
      animation: after-scale 0.5s linear forwards;
      flex-shrink: 0;
    }
  }
  &.normal {
    background: $bg;
  }
  &.primary {
    background: $p;
    color: #fff;
    border-color: $p;
  }
}
@keyframes after-scale {
  to {
    top: -6px;
    left: -6px;
    bottom: -6px;
    right: -6px;
    border-width: 6px;
    opacity: 0;
  }
}
@keyframes loading-spin {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>