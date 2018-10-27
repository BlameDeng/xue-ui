import Icon from './src/basic/icon/index.js'
import Button from './src/basic/button/index.js'
import Group from './src/basic/group/index.js'
import Switch from './src/form/switch/index.js'
import Input from './src/form/input/index.js'
import Textarea from './src/form/textarea/index.js'
import Grid from './src/layout/grid/index.js'
import Layout from './src/layout/layout/index.js'
import Collapse from './src/layout/collapse/index.js'
import Waterfall from './src/layout/waterfall/index.js'
import Tabs from './src/navigation/tabs/index.js'
import Nav from './src/navigation/nav/index.js'
import Pager from './src/viewport/pager/index.js'
import Popover from './src/viewport/popover/index.js'
import Message from './src/viewport/message/index.js'
import Slides from './src/viewport/slides/index.js'
import Spread from './src/others/spread/index.js'

const components = [
  Icon,
  Button,
  Group,
  Switch,
  Input,
  Textarea,
  Grid,
  Layout,
  Collapse,
  Waterfall,
  Tabs,
  Nav,
  Pager,
  Popover,
  Slides,
  Spread
]

const install = (Vue, options) => {
  components.forEach(component => {
    component.install(Vue)
  })
  Vue.use(Message)
}

export { Message }
export default { install }
