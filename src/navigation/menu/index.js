import Menu from './menu.vue'
import SubMenu from './sub-menu.vue'
import MenuItem from './menu-item.vue'

Menu.install = Vue => {
    Vue.component(Menu.name, Menu)
    Vue.component(SubMenu.name, SubMenu)
    Vue.component(MenuItem.name, MenuItem)
}

export default Menu