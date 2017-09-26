<template>
	<scroll 
		class="listview" 
		:data="data" 
		ref="listview" 
		:listenScroll = 'listenScroll'
		@scroll = "scroll"
		:probeType = "probeType"
	>
		<ul>
			<li class="list-group" ref="listGroup" v-for="group in data">
				<h2 class="list-group-title">{{ group.title }}</h2>
				<ul>
					<li 
						@click="selectItem(item)" 
						v-for="item in group.items" 
						class="list-group-item"
					>
						<img v-lazy="item.avatar" class="avatar">
						<span class="name">{{ item.name }}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li 
					:class="{ 'current':currentIndex == index }"
					v-for="(item,index) in shortcutList" 
					:data-index="index" 
					class="item">
					{{ item }}
				</li>
			</ul>
		</div>
		<div class="list-fixed" v-show="fixedTitle" ref="fixed">
			<h1 class="fixed-title">
				{{ fixedTitle }}
			</h1>
		</div>
		<div v-show="!data.length" class="loading-container">
			<loading></loading>
		</div>
	</scroll>
</template>

<script type="text/javascript">
	import Scroll from '../../base/scroll/scroll.vue'
	import {getData} from '../../common/js/dom.js'
	import Loading from '../../base/loading/loading.vue'

	//一个歌手锚点的高度，由CSS固定为18px
	const ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 30

	export default{
		created(){
			this.touch = {}
			this.listenScroll = true
			this.listHeight = []
			this.probeType = 3
		},
		data(){
			return{
				scrollY: -1,
				currentIndex: 0,
				diff: -1
			}
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		computed: {
			shortcutList(){
				//data为数组，使用map方法获取group的title
				return this.data.map((group) => {
					//title只取第一个字符
					return group.title.substr(0, 1)
				})
			},
			fixedTitle(){
				//如果滑到顶部,return
				if(this.scrollY > 0){
					return
				}
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
			}
		},
		components: {
			Scroll,
			Loading
		},
		methods: {
			//listview是基础组件，所以它只派发事件，不处理业务逻辑
			selectItem(item){
				this.$emit('select',item)
			},
			//触摸开始
			onShortcutTouchStart(e){
				//获取触摸元素的index
				let anchorIndex = getData(e.target, 'index')
				//touches是所有触摸点的列表
				let firstTouch = e.touches[0]
				//触摸目标在页面中的Y坐标
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex)
			},
			//触摸滑动
			onShortcutTouchMove(e){
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				//获取Y方向移动了多少像素，‘| 0’的意思是向下取整，类似floor()
				let delta = (this.touch.y2 - this.touch.y1) /ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
				this._scrollTo(anchorIndex)
			},
            refresh(){
                this.$refs.listview.refresh()
            },
			scroll(pos){
				this.scrollY = pos.y
			},
			_scrollTo(index){
				if(index !== 0 && !index){
					return
				}

				//保证右侧导航栏滑到顶部和底部时active效果不消失
				if(index < 0){
					index = 0
				}else if(index > this.listHeight.length -2){
					index = this.listHeight.length -2
				}

				//点击右侧导航栏时无法触发scroll()
				//所以手动将Y轴华东距离设置成顶部到current的高度
				this.scrollY = -this.listHeight[index]

				//scrollToElement(el,time,...)是Better-Scroll的方法,滚动到某个元素
				//el（必填）表示 dom 元素
				//time表示移动的时间，在这里为0
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
			},
			_caculateHeight(){
				//listHeight[]:存放各个group的高度
				this.listHeight = []
				//list[]:首字母的数组
				const list = this.$refs.listGroup
				//height:首字母group的高度
				let height = 0
				this.listHeight.push(height)
				//console.log(this.listHeight)
				//循环累加item获取每个首字母group的高度
				for(let i = 0;i < list.length;i++){
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			}
		},
		watch: {
			data(){
				setTimeout(() => {
					this._caculateHeight()
				},20)
			},

			//获得现在页面所在哪个group: currentIndex
			scrollY(newY){
				const listHeight = this.listHeight

				//当滚动到顶部，newY > 0，newY是滚动的距离
				if(newY > 0){
					return
				}

				//在中间部分滚动
				for ( let i = 0;i < listHeight.length;i++ ){
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if(-newY >= height1 && -newY < height2 ){
						this.currentIndex = i
						this.diff = height2 + newY
						//console.log(this.currentIndex)
						return
					}
					this.currentIndex = 0
				}

				//当滚动到底部，且-newY大于最后一个元素的高度
				this.currentIndex = listHeight.length -2
			},
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
				if (this.fixedTop === fixedTop) {
				  return
				}
				this.fixedTop = fixedTop
				this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
			}
		}
	}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: black
        background: #d6c7c0
        border-radius:10px
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: white
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: black
        background: #d6c7c0
        border-radius:10px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>