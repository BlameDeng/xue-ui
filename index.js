import Icon from './src/basic/icon/index.js'
import Button from './src/basic/button/index.js'
import Group from './src/basic/group/index.js'
import Switch from './src/form/switch/index.js'
import Input from './src/form/input/index.js'
import Textarea from './src/form/textarea/index.js'
import Cascader from './src/form/cascader/index.js'
import Grid from './src/layout/grid/index.js'
import Container from './src/layout/container/index.js'
import Collapse from './src/layout/collapse/index.js'
import Waterfall from './src/layout/waterfall/index.js'
import Tabs from './src/navigation/tabs/index.js'
import Menu from './src/navigation/menu/index.js'
import Pager from './src/navigation/pager/index.js'
import Loading from './src/navigation/loading/index.js'
import Popover from './src/viewport/popover/index.js'
import Message from './src/viewport/message/index.js'
import Slides from './src/viewport/slides/index.js'
import Spread from './src/others/spread/index.js'
import Spin from './src/others/spin/index.js'

const components = [
    Icon,
    Button,
    Group,
    Switch,
    Input,
    Textarea,
    Cascader,
    Grid,
    Container,
    Collapse,
    Waterfall,
    Tabs,
    Menu,
    Pager,
    Loading,
    Popover,
    Slides,
    Spread,
    Spin
]

const install = (Vue, options) => {
    components.forEach(component => {
        component.install(Vue)
    })
    Vue.use(Message)
}

export { Message, Loading }
export default { install, Loading, Message }