import Col from './col.vue'
import Row from './row.vue'

const Grid={}

Grid.install = Vue => {
  Vue.component(Col.name, Col)
  Vue.component(Row.name, Row)
}

export default Grid
