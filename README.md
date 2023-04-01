# vue2-template
这是一个关于vue2结合uniapp以及uview2.0框架的一个项目模板

# 亮点

- [x] 可以实现国际化
- [x] 可以自定义请求拦截和响应拦截，已有拦截代码
- [x] 封装vuex，实现统一化管理
- [x] 可以自定义跨域请求
- [x] 可以开发H5应用、微信小程序、App，已有实例
- [x] 可以实现单页面模板自定义，实现Safari浏览器添加到桌面的应用自定义
- [x] 已集成uniapp和uview组件库，避免二次引入，高效开发





# 项目结构

## api

存放接口请求的目录，内置已封装index.js用于批量导出

规范：接口类型名字+js

## page

用于所有存放所有页面的目录

## component

用于存放所有组件模块的文件夹

## store

使用vuex进行统一状态管理，已经进行二次封装

仅需要在module中创建  类型名+js文件 即可，并在index.js文件中进行统一暴露出去

```
export default new Vuex.Store({
  modules: {
    app,
	user
	xxxx  //自定义模块名
  },
  getters
})

```

## utils

存放所有工具类js

其中request.js使用*luch-request*进行二次封装请求拦截和响应拦截，可自定义请求封装

## static

存放静态文件

## Public（可忽略）

用于构建单页面应用的静态模板，可以对safari浏览器添加到桌面应用自定义

注意：使用自定义模板需要在manifest.json中的web配置中进行配置

