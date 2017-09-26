# vue-music

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## 效果截图
<img style="float: left;clear: both;" src="static/1.jpg" width="40%">
<img style="margin-top: -26px; margin-left: 20px;" src="static/2.png" width="40%">
<img style="float: left;clear: both;" src="static/3.png" width="40%">
<img style="margin-top: -26px; margin-left: 20px;" src="static/4.png" width="40%">
<img style="float: left;clear: both;" src="static/6.png" width="40%">
<img style="margin-top: -26px; margin-left: 20px;" src="static/7.png" width="40%">



## 项目树
```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package.json
├── prod.server.js
├── src
│   ├── App.vue
│   ├── api
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js
│   │   ├── search.js
│   │   ├── singer.js
│   │   └── song.js
│   ├── base
│   │   ├── confirm
│   │   │   └── confirm.vue
│   │   ├── listview
│   │   │   └── listview.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── loading.vue
│   │   ├── no-result
│   │   │   ├── no-result.vue
│   │   │   ├── no-result@2x.png
│   │   │   └── no-result@3x.png
│   │   ├── progress-bar
│   │   │   └── progress-bar.vue
│   │   ├── progress-circle
│   │   │   └── progress-circle.vue
│   │   ├── scroll
│   │   │   └── scroll.vue
│   │   ├── search-box
│   │   │   └── search-box.vue
│   │   ├── search-list
│   │   │   └── search-list.vue
│   │   ├── slider
│   │   │   └── slider.vue
│   │   ├── song-list
│   │   │   ├── first@2x.png
│   │   │   ├── first@3x.png
│   │   │   ├── second@2x.png
│   │   │   ├── second@3x.png
│   │   │   ├── song-list.vue
│   │   │   ├── third@2x.png
│   │   │   └── third@3x.png
│   │   ├── switches
│   │   │   └── switches.vue
│   │   └── top-tip
│   │       └── top-tip.vue
│   ├── common
│   │   ├── fonts
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── image
│   │   │   └── default.png
│   │   ├── js
│   │   │   ├── cache.js
│   │   │   ├── config.js
│   │   │   ├── dom.js
│   │   │   ├── jsonp.js
│   │   │   ├── mixin.js
│   │   │   ├── singer.js
│   │   │   ├── song.js
│   │   │   └── util.js
│   │   └── stylus
│   │       ├── base.styl
│   │       ├── icon.styl
│   │       ├── index.styl
│   │       ├── mixin.styl
│   │       ├── reset.styl
│   │       └── variable.styl
│   ├── components
│   │   ├── add-song
│   │   │   └── add-song.vue
│   │   ├── disc
│   │   │   └── disc.vue
│   │   ├── m-header
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── m-header.vue
│   │   ├── music-list
│   │   │   └── music-list.vue
│   │   ├── player
│   │   │   └── player.vue
│   │   ├── playlist
│   │   │   └── playlist.vue
│   │   ├── rank
│   │   │   └── rank.vue
│   │   ├── recommend
│   │   │   └── recommend.vue
│   │   ├── search
│   │   │   └── search.vue
│   │   ├── singer
│   │   │   └── singer.vue
│   │   ├── singer-detail
│   │   │   └── singer-detail.vue
│   │   ├── suggest
│   │   │   └── suggest.vue
│   │   ├── tab
│   │   │   └── tab.vue
│   │   ├── top-list
│   │   │   └── top-list.vue
│   │   └── user-center
│   │       └── user-center.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── store
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── state.js
└── static
    ├── 1.png
    ├── 2.png
    ├── 3.png
    ├── 4.png
    └── 5.png

```

## 技术栈
* MVVM框架：Vue （版本2.x）
* 状态管理：vuex
* 前端路由：vue-router
* 构建工具：vue-cli
* 打包工具: webpack 2.0
* 服务端通讯：axios、jsonp
* 懒加载：vue-lazyload
* 移动端滚动库：better-scroll
* 源码：es6

## 基础组件
1. confirm：确认对话框组件
2. listview：通讯录列表组件
3. loading：加载态组件
4. no-result：无结果展示组件
5. progress-bar：进度条组件
6. progress-circle：圆形进度条组件
7. scroll：移动端滚动组件
8. search-box：搜索框组件
9. search-list：搜索列表组件
10. slider：轮播图组件
11. switches：开关切换组件
12. top-tip：顶部消息提示组件
13. song-list：歌曲列表组件


##业务组件
1. add-song：添加歌曲到列表组件
2. disc：歌单详情页组件
3. m-header：页面头部组件
4. music-list：歌曲列表页面组件
5. player：播放器内核组件
6. playlist：播放列表组件
7. rank：排行榜页面组件
8. recommend：推荐页面组件
9. search：搜索页面组件
10. singer：歌手页面组件
11. singer-detail：歌手详情页组件
12. suggest：搜索提示列表组件
13. tab：顶部导航栏组件
14. top-list：排行榜详情页组件
15. user-center：用户中心页组件


## 注意
所有数据来自于QQ音乐，若接口改变就需要修改 jsonp 和 axios 代码
