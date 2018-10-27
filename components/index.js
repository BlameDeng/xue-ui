import Icon from './basic/icon/index.js'
import Button from './basic/button/index.js'
import Group from './basic/group/index.js'
import Switch from './form/switch/index.js'
import Input from './form/input/index.js'
import Textarea from './form/textarea/index.js'
import Grid from './layout/grid/index.js'
import Layout from './layout/layout/index.js'
import Collapse from './layout/collapse/index.js'
import Waterfall from './layout/waterfall/index.js'
import Tabs from './navigation/tabs/index.js'
import Nav from './navigation/nav/index.js'
import Pager from './viewport/pager/index.js'
import Popover from './viewport/popover/index.js'
import Message from './viewport/message/index.js'
import Slides from './viewport/slides/index.js'
import Spread from './others/spread/index.js'

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