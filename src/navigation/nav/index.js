import Nav from './nav.vue'
import NavSub from './nav-sub.vue'
import NavItem from './nav-item.vue'

Nav.install = Vue => {
  Vue.component(Nav.name, Nav)
  Vue.component(NavSub.name, NavSub)
  Vue.component(NavItem.name, NavItem)
}

export default Nav