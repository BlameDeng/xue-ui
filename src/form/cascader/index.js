import Cascader from './cascader.vue'
import CascaderItem from './cascader-item.vue'

Cascader.install = Vue => {
    Vue.component(Cascader.name, Cascader)
    Vue.component(CascaderItem.name, CascaderItem)
}

export default Cascader