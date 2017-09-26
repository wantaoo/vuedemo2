# Vue Music

## 预览地址

在线效果预览地址：https://wantaoo.github.io/vuedemo2/vue-music/dist1

## Build SetUp

![](https://wantaoo.github.io/vuedemo2/vue-music/static/build.png) 
## 效果截图
![](https://wantaoo.github.io/vuedemo2/vue-music/static/recommend.jpg)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/singer.jpg)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/rank.jpg)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/search.jpg)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/searchList.jpg)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/searchHistory.jpg)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/player.png)
![](https://wantaoo.github.io/vuedemo2/vue-music/static/searchMiniPlayer.jpg)

## 技术栈

Vue2.0：前端页面展示。</br>
axios：一个基于 Promise 的 HTTP 库，向后端发起请求。</br>
request、request-promise：没有用Node.js原生的http/https模块是因为不喜欢回调函数式的异步，可读性和可维护性很差。所以选择了request+request-promise，让异步更为优雅一点。</br>
Stylus：用Stylus做CSS预处理语言，让CSS 更加简洁，适应性更强。</br>
ES6：提供了更接近传统语言的写法，引入了Class（类）这个概念。新的class写法让对象原型的写法更加清晰、更像面向对象编程的语法，也更加通俗易懂。</br>
Webpack：vue-cli自带Webpack，但是需要自己改造一下，比如要对 build/dev-server.js扩展express，增加后端请求路由。此外需要安装相关loader，vue-cli已经配置好了webpack，只需要安装依赖就可以。</br>
flex：flex弹性布局。</br>
CSS3：CSS3过渡动画及样式。</br>

## 注意
所有数据来自于QQ音乐，若接口改变就需要修改 jsonp 和 axios 代码
