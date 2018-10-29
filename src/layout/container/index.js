import Container from './container.vue'
import Header from './header.vue'
import Main from './main.vue'
import Sider from './sider.vue'
import Footer from './footer.vue'

Container.install = Vue => {
  Vue.component(Container.name, Container)
  Vue.component(Header.name, Header)
  Vue.component(Main.name, Main)
  Vue.component(Sider.name, Sider)
  Vue.component(Footer.name, Footer)
}

export default Container
