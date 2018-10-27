import Tabs from './tabs.vue'
import TabsTitle from './tabs-title.vue'
import TabsPane from './tabs-pane.vue'

Tabs.install = Vue => {
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabsTitle.name, TabsTitle)
  Vue.component(TabsPane.name, TabsPane)
}

export default Tabs
