# Xue-ui

![](https://img.shields.io/badge/license-MIT-000000.svg)

> 本组件库仅供学习交流，请勿在生产环境中使用

[官方文档](https://xue-ui.com.cn)

## 安装

克隆官方仓库或者使用 npm / yarn 安装

```
$ git clone git@github.com:BlameDeng/xue-ui.git

$ npm install xue-ui
$ yarn add xue-ui
```

## 使用

如果使用了 npm / yarn 安装，一般在 main.js 中如下配置：

```javascript
import Vue from 'vue'
import App from 'components/app.vue'
import Xue from 'xue-ui'
import 'xue-ui/lib/xue-ui.css'
Vue.use(Xue)
new Vue({
  el: '#app',
  render: h => h(App)
})
```
以上代码便完成了 Xue-ui 的引入。需要注意的是，样式文件需要单独引入。

## 特别提醒

使用 Xue-ui 时，您需要使用 border-box 盒模型，否则会影响样式。代码示例：

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

如果您觉得还不错，请 star