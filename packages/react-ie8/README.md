# React For IE8

`React`并不支持ie8，因此采用`Nerv+React`的解决方案。
`Nerv`是京东凹凸实验室开源的前端框架，兼容ie8并且采用`React`的API。

* `Nerv`官网地址：[https://nerv.aotu.io/](https://nerv.aotu.io/)
* `Nerv`仓库地址：[https://github.com/NervJS/nerv](https://github.com/NervJS/nerv)
* `Nerv`文档地址：[https://nervjs.github.io/docs/](https://nervjs.github.io/docs/)

```shell
# dev（开发模式，仅支持ie9+及其他浏览器）
npm run dev

# build（构建代码）
npm run build

# build（构建IE8代码）
npm run build:ie8
```