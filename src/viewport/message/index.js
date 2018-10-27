import Vue from 'vue'
import messageComponent from './message.vue'
import confirmComponent from './confirm.vue'

const Message = {
  install(Vue, options) {
    Vue.prototype.$success = function({
      message,
      duration = 2000,
      closable = false
    }) {
      const Constructor = Vue.extend(messageComponent)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Constructor({
        propsData: {
          options: {
            type: 'success',
            message,
            duration,
            closable
          }
        }
      }).$mount(div)
      vm.visible = true
    }

    Vue.prototype.$info = function({
      message,
      duration = 2000,
      closable = false
    }) {
      const Constructor = Vue.extend(messageComponent)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Constructor({
        propsData: {
          options: {
            type: 'info',
            message,
            duration,
            closable
          }
        }
      }).$mount(div)
      vm.visible = true
    }

    Vue.prototype.$warning = function({
      message,
      duration = 2000,
      closable = false
    }) {
      const Constructor = Vue.extend(messageComponent)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Constructor({
        propsData: {
          options: {
            type: 'warning',
            message,
            duration,
            closable
          }
        }
      }).$mount(div)
      vm.visible = true
    }

    Vue.prototype.$error = function({
      message,
      duration = 2000,
      closable = false
    }) {
      const Constructor = Vue.extend(messageComponent)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Constructor({
        propsData: {
          options: {
            type: 'error',
            message,
            duration,
            closable
          }
        }
      }).$mount(div)
      vm.visible = true
    }

    Vue.prototype.$confirm = function(options) {
      const Constructor = Vue.extend(confirmComponent)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Constructor({
        propsData: options
      }).$mount(div)
      vm.visible = true
      return vm.confirm()
    }
  },

  success({ message, duration = 2000, closable = false }) {
    const Constructor = Vue.extend(messageComponent)
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new Constructor({
      propsData: {
        options: {
          type: 'success',
          message,
          duration,
          closable
        }
      }
    }).$mount(div)
    vm.visible = true
  },

  info({ message, duration = 2000, closable = false }) {
    const Constructor = Vue.extend(messageComponent)
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new Constructor({
      propsData: {
        options: {
          type: 'info',
          message,
          duration,
          closable
        }
      }
    }).$mount(div)
    vm.visible = true
  },

  warning({ message, duration = 2000, closable = false }) {
    const Constructor = Vue.extend(messageComponent)
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new Constructor({
      propsData: {
        options: {
          type: 'warning',
          message,
          duration,
          closable
        }
      }
    }).$mount(div)
    vm.visible = true
  },

  error({ message, duration = 2000, closable = false }) {
    const Constructor = Vue.extend(messageComponent)
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new Constructor({
      propsData: {
        options: {
          type: 'error',
          message,
          duration,
          closable
        }
      }
    }).$mount(div)
    vm.visible = true
  },

  confirm(options) {
    const Constructor = Vue.extend(confirmComponent)
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new Constructor({
      propsData: options
    }).$mount(div)
    vm.visible = true
    return vm.confirm()
  }
}

export default Message
