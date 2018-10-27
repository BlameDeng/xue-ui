import Layout from './layout.vue'
import Header from './header.vue'
import Content from './content.vue'
import Sider from './sider.vue'
import Footer from './footer.vue'

Layout.install = Vue => {
  Vue.component(Layout.name, Layout)
  Vue.component(Header.name, Header)
  Vue.component(Content.name, Content)
  Vue.component(Sider.name, Sider)
  Vue.component(Footer.name, Footer)
}

export default Layout
