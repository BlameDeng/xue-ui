# Xue-ui

![](https://img.shields.io/badge/license-MIT-000000.svg)

[官方文档](http://xue-ui.com.cn)

## 写在前面

Xue-ui 是我在饥人谷学习前端过程中制作的一个 UI 组件库。

## 安装

克隆官方仓库或者使用 npm / yarn 安装

```
$ git clone git@github.com:BlameDeng/xue-ui.git

$ npm install xue-ui
$ yarn add xue-ui
```

## 使用

如果使用了 npm / yarn 安装，一般在 main.js 中如下配置

```javascript
import Vue from 'vue'
import App from 'components/app.vue'
import Xue from 'xue-ui'
Vue.use(Xue)
new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 特别提醒

使用 Xue-ui 时，您需要使用 border-box 盒模型，否则会影响样式。CSS 代码示例：

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
