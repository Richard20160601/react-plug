# 项目描述
预览地址：[http://coo.shuxia123.com](http://coo.shuxia123.com)<br/>
手机端访问：![githubusercontent](https://github.com/coocssweb/react-plug/blob/master/public/images/qr.png "手机端预览")<br /><br />
虽然现在有很多React前端组件，但因为很多只是在第三方组件的基础上封装了样式进行修饰，所以改起来会很复杂<br />
比如：你用[Material-UI]，虽然动画效果很好看，但一些坑还挺深的。<br />
所以，就用8小时之外的事件，造一些轮子。<br />
这个组件，全部没有用第三方组件，组件语法全是ES5语法，有详细的代码注释，然后现在也在完善文档。<br />
稳定性方面，这些组件是从以前做过的几个项目中抽离出来的，可以用PC、手机浏览器进行浏览。

# 目录描述
- Src 目录 ： React源码目录
- public 目录 ： 实例的相关的样式（Examples的样式，与通用组件无关）
- dist 目录 ： webpack构建目录
- Src/Examples ： 实例代码（组件如何调用的代码）
- Src/CooComponents ： 组件代码（包含React代码、样式代码、图片代码），引用到你的项目只要拷贝这个目录就可以了

# 环境搭建
- git 拷贝代码后，运行npm install ，安装环境
- 环境安装完后，运行 npm start ，启动项目，通过http://localhost:3000 访问实例
- 构建代码，运行npm run build，构建代码，会在/dist/生成对应的目录。

#更新日志
