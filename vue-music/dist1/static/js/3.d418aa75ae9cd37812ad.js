webpackJsonp([3],{578:function(e,t,n){function i(e){n(617)}var o=n(9)(n(596),n(629),i,"data-v-74b4415a",null);e.exports=o.exports},590:function(e,t,n){"use strict";function i(){var e=A()({},c.b,{platfrom:"h5",uin:0,needNewCode:1});return n.i(l.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",e,c.c)}function o(){var e=A()({},c.b,{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,needNewCode:0,categoryId:1e7,rnd:Math.random(),format:"json"});return p.a.get("/api/getDiscList",{params:e}).then(function(e){return a.a.resolve(e.data)})}function r(e){var t=A()({},c.b,{disstid:e,type:1,json:1,utf8:1,onlysong:0,platform:"yqq",hostUin:0,needNewCode:0});return n.i(l.a)("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",t,C)}t.b=i,t.c=o,t.a=r;var s=n(90),a=n.n(s),d=n(88),A=n.n(d),l=n(200),c=n(57),m=n(89),p=n.n(m),C={param:"jsonpCallback",prefix:"playlistinfoCallback"}},593:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(206),o=n.n(i),r=n(128);t.default={data:function(){return{dots:[],currentPageIndex:0}},props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:1e3}},mounted:function(){var e=this;setTimeout(function(){e._setSliderWidth(),e._initDots(),e._initSlider(),e.autoPlay&&e._play()},20),window.addEventListener("resize",function(){e.slider&&(e._setSliderWidth(!0),e.slider.refresh())})},methods:{_setSliderWidth:function(e){this.children=this.$refs.sliderGroup.children;for(var t=0,i=this.$refs.slider.clientWidth,o=0;o<this.children.length;o++){var s=this.children[o];n.i(r.c)(s,"slider-item"),s.style.width=i+"px",t+=i}this.loop&&!e&&(t+=2*i),this.$refs.sliderGroup.style.width=t+"px"},_initDots:function(){this.dots=new Array(this.children.length)},_initSlider:function(){var e=this;this.slider=new o.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:!0,snapLoop:this.loop,snapThreshold:.3,snapSpeed:400,autoPlay:!0}),this.slider.on("scrollEnd",function(){var t=e.slider.getCurrentPage().pageX;e.loop&&(t-=1),e.currentPageIndex=t,e.autoPlay&&(clearTimeout(e.timer),e._play())})},_play:function(){var e=this,t=this.currentPageIndex+1;this.loop&&(t+=1),this.timer=setTimeout(function(){e.slider.goToPage(t,0,400)},this.interval)}},destroyed:function(){clearTimeout(this.timer)}}},596:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(58),o=n.n(i),r=n(201),s=n.n(r),a=n(66),d=n.n(a),A=n(623),l=n.n(A),c=n(590),m=n(57),p=n(87),C=n(48);t.default={mixins:[p.c],data:function(){return{recommends:[],discList:[]}},created:function(){this._getRecommend(),this._getDiscList()},methods:o()({handlePlaylist:function(e){var t=e.length>0?"60px":"";this.$refs.recommend.style.bottom=t,this.$refs.scroll.refresh()},loadImage:function(){this.checkloaded||(this.checkloaded=!0,this.$refs.scroll.refresh())},selectItem:function(e){this.$router.push({path:"/recommend/"+e.dissid}),this.setDisc(e)},_getRecommend:function(){var e=this;n.i(c.b)().then(function(t){t.code===m.a&&(e.recommends=t.data.slider)})},_getDiscList:function(){var e=this;n.i(c.c)().then(function(t){t.code===m.a&&(e.discList=t.data.list)})}},n.i(C.b)({setDisc:"SET_DISC"})),components:{Slider:l.a,Loading:s.a,Scroll:d.a}}},607:function(e,t,n){t=e.exports=n(574)(!0),t.push([e.i,".recommend[data-v-74b4415a]{position:fixed;width:100%;top:88px;bottom:0}.recommend .recommend-content[data-v-74b4415a]{height:100%;overflow:hidden}.recommend .recommend-content .slider-wrapper[data-v-74b4415a]{position:relative;width:100%;overflow:hidden}.recommend .recommend-content .recommend-list .list-title[data-v-74b4415a]{height:65px;line-height:65px;text-align:center;font-size:14px;color:#ffcd32}.recommend .recommend-content .recommend-list .item[data-v-74b4415a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 20px 20px}.recommend .recommend-content .recommend-list .item .icon[data-v-74b4415a]{-webkit-box-flex:0;-ms-flex:0 0 60px;flex:0 0 60px;width:60px;padding-right:20px}.recommend .recommend-content .recommend-list .item .text[data-v-74b4415a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-flex:1;-ms-flex:1;flex:1;line-height:20px;overflow:hidden;font-size:14px}.recommend .recommend-content .recommend-list .item .text .name[data-v-74b4415a]{margin-bottom:10px;color:#fff}.recommend .recommend-content .recommend-list .item .text .desc[data-v-74b4415a]{color:hsla(0,0%,100%,.3)}.recommend .recommend-content .loading-container[data-v-74b4415a]{position:absolute;width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}","",{version:3,sources:["C:/Users/Administrator/Desktop/vue-music/src/components/recommend/recommend.vue"],names:[],mappings:"AACA,4BACE,eAAgB,AAChB,WAAY,AACZ,SAAU,AACV,QAAU,CACX,AACD,+CACE,YAAa,AACb,eAAiB,CAClB,AACD,+DACE,kBAAmB,AACnB,WAAY,AACZ,eAAiB,CAClB,AACD,2EACE,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,aAAe,CAChB,AACD,qEACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AACvB,sBAAuB,AAC/B,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,mBAA0B,CAC3B,AACD,2EACE,mBAAoB,AAChB,kBAAmB,AACf,cAAe,AACvB,WAAY,AACZ,kBAAoB,CACrB,AACD,2EACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,iBAAkB,AAClB,gBAAiB,AACjB,cAAgB,CACjB,AACD,iFACE,mBAAoB,AACpB,UAAY,CACb,AACD,iFACE,wBAA6B,CAC9B,AACD,kEACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CACrC",file:"recommend.vue",sourcesContent:["\n.recommend[data-v-74b4415a] {\n  position: fixed;\n  width: 100%;\n  top: 88px;\n  bottom: 0;\n}\n.recommend .recommend-content[data-v-74b4415a] {\n  height: 100%;\n  overflow: hidden;\n}\n.recommend .recommend-content .slider-wrapper[data-v-74b4415a] {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.recommend .recommend-content .recommend-list .list-title[data-v-74b4415a] {\n  height: 65px;\n  line-height: 65px;\n  text-align: center;\n  font-size: 14px;\n  color: #ffcd32;\n}\n.recommend .recommend-content .recommend-list .item[data-v-74b4415a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0 20px 20px 20px;\n}\n.recommend .recommend-content .recommend-list .item .icon[data-v-74b4415a] {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 60px;\n          flex: 0 0 60px;\n  width: 60px;\n  padding-right: 20px;\n}\n.recommend .recommend-content .recommend-list .item .text[data-v-74b4415a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  line-height: 20px;\n  overflow: hidden;\n  font-size: 14px;\n}\n.recommend .recommend-content .recommend-list .item .text .name[data-v-74b4415a] {\n  margin-bottom: 10px;\n  color: #fff;\n}\n.recommend .recommend-content .recommend-list .item .text .desc[data-v-74b4415a] {\n  color: rgba(255,255,255,0.3);\n}\n.recommend .recommend-content .loading-container[data-v-74b4415a] {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}"],sourceRoot:""}])},610:function(e,t,n){t=e.exports=n(574)(!0),t.push([e.i,".slider[data-v-d589a78a]{min-height:1px}.slider .slider-group[data-v-d589a78a]{position:relative;overflow:hidden;white-space:nowrap}.slider .slider-group .slider-item[data-v-d589a78a]{float:left;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;text-align:center}.slider .slider-group .slider-item a[data-v-d589a78a]{display:block;width:100%;overflow:hidden;text-decoration:none}.slider .slider-group .slider-item img[data-v-d589a78a]{display:block;width:100%}.slider .dots[data-v-d589a78a]{position:absolute;right:0;left:0;top:135px;text-align:center;font-size:0}.slider .dots .dot[data-v-d589a78a]{display:inline-block;margin:0 4px;width:8px;height:8px;border-radius:50%;background:hsla(0,0%,100%,.5)}.slider .dots .dot.active[data-v-d589a78a]{width:20px;border-radius:5px;background:hsla(0,0%,100%,.8)}","",{version:3,sources:["C:/Users/Administrator/Desktop/vue-music/src/base/slider/slider.vue"],names:[],mappings:"AACA,yBACE,cAAgB,CACjB,AACD,uCACE,kBAAmB,AACnB,gBAAiB,AACjB,kBAAoB,CACrB,AACD,oDACE,WAAY,AACZ,8BAA+B,AACvB,sBAAuB,AAC/B,gBAAiB,AACjB,iBAAmB,CACpB,AACD,sDACE,cAAe,AACf,WAAY,AACZ,gBAAiB,AACjB,oBAAsB,CACvB,AACD,wDACE,cAAe,AACf,UAAY,CACb,AACD,+BACE,kBAAmB,AACnB,QAAS,AACT,OAAQ,AACR,UAAW,AACX,kBAAmB,AACnB,WAAa,CACd,AACD,oCACE,qBAAsB,AACtB,aAAc,AACd,UAAW,AACX,WAAY,AACZ,kBAAmB,AACnB,6BAAkC,CACnC,AACD,2CACE,WAAY,AACZ,kBAAmB,AACnB,6BAAkC,CACnC",file:"slider.vue",sourcesContent:["\n.slider[data-v-d589a78a] {\n  min-height: 1px;\n}\n.slider .slider-group[data-v-d589a78a] {\n  position: relative;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.slider .slider-group .slider-item[data-v-d589a78a] {\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n}\n.slider .slider-group .slider-item a[data-v-d589a78a] {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n  text-decoration: none;\n}\n.slider .slider-group .slider-item img[data-v-d589a78a] {\n  display: block;\n  width: 100%;\n}\n.slider .dots[data-v-d589a78a] {\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 135px;\n  text-align: center;\n  font-size: 0;\n}\n.slider .dots .dot[data-v-d589a78a] {\n  display: inline-block;\n  margin: 0 4px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.5);\n}\n.slider .dots .dot.active[data-v-d589a78a] {\n  width: 20px;\n  border-radius: 5px;\n  background: rgba(255,255,255,0.8);\n}"],sourceRoot:""}])},617:function(e,t,n){var i=n(607);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(575)("32a29550",i,!0)},620:function(e,t,n){var i=n(610);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(575)("4930aec0",i,!0)},623:function(e,t,n){function i(e){n(620)}var o=n(9)(n(593),n(632),i,"data-v-d589a78a",null);e.exports=o.exports},629:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"recommend",staticClass:"recommend"},[n("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:e.discList}},[n("div",[e.recommends.length?n("div",{ref:"sliderWrapper",staticClass:"slider-wrapper"},[n("slider",e._l(e.recommends,function(t){return n("div",[n("a",{attrs:{href:t.linkUrl}},[n("img",{staticClass:"needsclick",attrs:{src:t.picUrl},on:{load:e.loadImage}})])])}))],1):e._e(),e._v(" "),n("div",{staticClass:"recommend-list"},[n("h1",{staticClass:"list-title"},[e._v("热门歌单推荐")]),e._v(" "),n("ul",e._l(e.discList,function(t){return n("li",{staticClass:"item",on:{click:function(n){e.selectItem(t)}}},[n("div",{staticClass:"icon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"item.imgurl"}],attrs:{width:"60",height:"60"}})]),e._v(" "),n("div",{staticClass:"text"},[n("h2",{staticClass:"name",domProps:{innerHTML:e._s(t.creator.name)}}),e._v(" "),n("p",{staticClass:"desc",domProps:{innerHTML:e._s(t.dissname)}})])])}))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.discList.length,expression:"!discList.length"}],staticClass:"loading-container"},[n("loading")],1)]),e._v(" "),n("router-view")],1)},staticRenderFns:[]}},632:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"slider",staticClass:"slider"},[n("div",{ref:"sliderGroup",staticClass:"slider-group"},[e._t("default")],2),e._v(" "),n("div",{staticClass:"dots"},e._l(e.dots,function(t,i){return n("span",{staticClass:"dot",class:{active:e.currentPageIndex===i}})}))])},staticRenderFns:[]}}});
//# sourceMappingURL=3.d418aa75ae9cd37812ad.js.map