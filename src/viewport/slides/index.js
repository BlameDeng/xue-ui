import Slides from './slides.vue'
import SlidesItem from './slides-item.vue'

Slides.install = Vue => {
  Vue.component(Slides.name, Slides)
  Vue.component(SlidesItem.name, SlidesItem)
}

export default Slides