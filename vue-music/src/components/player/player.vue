<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" 
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currrentLineNum === index }"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{ format(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon" @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name"  v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
            <progress-circle :percent="percent">
              <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
            </progress-circle>
        </div>
        <div class="control" @click="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio @ended="end" @timeupdate="updateTime" @play="ready" @error="error" ref="audio" :src="currentSong.url"></audio>
  </div> 
</template>

<script type="text/javascript">
import { mapGetters,mapMutations,mapActions } from 'vuex'
import animations from 'create-keyframe-animation' 
import {prefixStyle} from '../../common/js/dom.js'
import ProgressBar from '../../base/progress-bar/progress-bar'
import ProgressCircle from '../../base/progress-circle/progress-circle'
import {playMode} from '../../common/js/config.js'
import {shuffle} from '../../common/js/util.js' 
import {ERR_OK} from '../../api/config.js'
import Lyric from 'lyric-parser'
import Scroll from '../../base/scroll/scroll.vue'
import Playlist from '../../components/playlist/playlist.vue'
import {playerMixin} from '../../common/js/mixin.js'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
    mixins: [playerMixin],
    data(){
        return {
            songReady: false,
            currentTime: 0,
            currentLyric: null,
            currrentLineNum: 0,
            currentShow: 'cd',
            playingLyric: ''
        }
    },
    computed: {
        cdCls(){
          return this.playing ? 'play' : 'play pause'
        },
        playIcon(){
          return this.playing ? 'icon-pause' : 'icon-play'
        },
        iconMode(){
          return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        miniIcon(){
          return this.playing ? 'icon-pause-mini' : 'icon-play-mini'            
        },
        disableCls(){
          return this.songReady ? '' : 'disable'
        },
        percent(){
          return this.currentTime / this.currentSong.duration
        },
        //mapGetters辅助函数仅仅是将store中的""getters""映射到局部计算属性中,
        //类似mapState
        ...mapGetters([
            'fullScreen',
            'playlist',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ])
    },
    created(){
      this.touch = {}
    },
    methods: {
        back(){
            this.setFullScreen(false)
        },
        open(){
            this.setFullScreen(true)
        },
        enter(el, done){
            const {x, y, scale} = this._getPosAndScale()
            let animation = {
                0: {
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0, 0, 0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0, 0, 0) scale(1)`
                }
            }
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 500,
                    easing: 'linear'
                }
            })

            animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter(){
            animations.unregisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done){
            this.$refs.cdWrapper.style.transition = 'all 0.4s'
            const {x, y, scale} = this._getPosAndScale()

            //****当对象名称为变量时，必须使用方括号才能访问**** 
            this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
            this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave(){
            this.$refs.cdWrapper.style.transition = ''
            this.$refs.cdWrapper.style[transform] = ''
        },
        togglePlaying(){
            if(!this.songReady) {
                return
            }
            this.setPlayingState(!this.playing)
            if(this.currentLyric){
              this.currentLyric.togglePlay()
            }
        }, 
        end(){
          if(this.mode === playMode.loop){
            this.loop()
          }else{
            this.next()
          }
        },
        loop(){
          this.$refs.audio.currentTime = 0
          this.$refs.audio.play()
          if(this.currentLyric){
            this.currentLyric.seek(0)
          }
        },
        next(){
            if(!this.songReady) {
                return
            }
            if(this.playlist.length === 1){
              this.loop()
            }else{
              let index = this.currentIndex + 1
              if(index === this.playlist.length){
                index = 0
              }
              this.setCurrentIndex(index)
              if(!this.playing){
                this.togglePlaying()
              }
              this.songReady = false
            }
        }, 
        prev(){
            if( !this.songReady ) {
                return
            }
            if(this.playlist.length === 1){
              this.loop()
            }else{
              let index = this.currentIndex - 1
              if( index === -1 ){
                  index = this.playlist.length - 1
              }
              this.setCurrentIndex(index)
              if( !this.playing ){
                  this.togglePlaying()
              }
            }
            this.songReady = false
        },  
        ready(){
            this.songReady = true
            this.savePlayHistory(this.currentSong)
        },
        error(){
            this.songReady = true
        },
        updateTime(e){
          //currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）。
          this.currentTime = e.target.currentTime
        },
        //将时间格式化
        format(interval){
          interval = Math.floor(interval)
          //  | 0,相当于Math.floor()
          const minute = interval / 60 | 0
          const second = this._pad(interval % 60)
          return `${minute}:${second}`
        },
        onProgressBarChange(percent){
          const currentTime = this.currentSong.duration * percent
          this.$refs.audio.currentTime = this.currentSong.duration * percent
          if(!this.playing){
            this.togglePlaying()
          }
          if(this.currentLyric){
            this.currentLyric.seek(currentTime * 1000)
          }
        },
        //切换播放模式
        changeMode(){
          const mode = (this.mode + 1) % 3
          this.setPlayMode(mode)
          let list = null
          if(mode === playMode.random ){
            list = shuffle(this.sequenceList)
          } else{
            list = this.sequenceList
          }
          this.resetCurrentIndex(list)
          this.setPlaylist(list)
        },
        resetCurrentIndex(list){
          let index = list.findIndex((item) => {
            return item.id === this.currentSong.id
          })
          this.setCurrentIndex(index)
        },
        getLyric(){
          this.currentSong.getLyric().then((lyric) => {
            this.currentLyric = new Lyric(lyric, this.handleLyric)
            if(this.playing){
              this.currentLyric.play()
            }
          }).catch(() => {
            this.currentLyric = null
            this.playingLyric = ''
            this.currentLineNum = 0
          })
        },
        handleLyric({lineNum, txt}){
          this.currrentLineNum = lineNum
          if(lineNum > 5){
            let lineEl = this.$refs.lyricLine[lineNum - 5]
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
          }else{
            this.$refs.lyricList.scrollToElement(0, 0, 1000)
          }
          this.playingLyric = txt
        },
        //父组件使用子组件的方法
        showPlaylist(){
          this.$refs.playlist.show()
        },
        middleTouchStart(e) {
          this.touch.initiated = true
          // 用来判断是否是一次移动
          this.touch.moved = false
          const touch = e.touches[0]
          this.touch.startX = touch.pageX
          this.touch.startY = touch.pageY
        },
        middleTouchMove(e) {
          if (!this.touch.initiated) {
            return
          }
          const touch = e.touches[0]
          const deltaX = touch.pageX - this.touch.startX
          const deltaY = touch.pageY - this.touch.startY
          if (Math.abs(deltaY) > Math.abs(deltaX)) {
            return
          }
          if (!this.touch.moved) {
            this.touch.moved = true
          }
          const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
          const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
          this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
          this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
          this.$refs.lyricList.$el.style[transitionDuration] = 0
          this.$refs.middleL.style.opacity = 1 - this.touch.percent
          this.$refs.middleL.style[transitionDuration] = 0
        },
        middleTouchEnd(){
          if (!this.touch.moved) {
            return
          }
          let offsetWidth
          let opacity
          if (this.currentShow === 'cd') {
            if (this.touch.percent > 0.1) {
              offsetWidth = -window.innerWidth
              opacity = 0
              this.currentShow = 'lyric'
            } else {
              offsetWidth = 0
              opacity = 1
            }
          } else {
            if (this.touch.percent < 0.9) {
              offsetWidth = 0
              this.currentShow = 'cd'
              opacity = 1
            } else {
              offsetWidth = -window.innerWidth
              opacity = 0
            }
          }
          const time = 300
          this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
          this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
          this.$refs.middleL.style.opacity = opacity
          this.$refs.middleL.style[transitionDuration] = `${time}ms`
          this.touch.initiated = false
        },
        _pad(num, n = 2){
          let len = num.toString().length
          while(len<n){
            num = '0' + num
            len++
          }
          return num
        },
        _getPosAndScale(){
            //mini播放器上cd图片的宽度
            const targetWidth = 40
            //mini播放器上cd图片中心坐标到左边的距离
            const paddingLeft = 40
            //mini播放器上cd图片中心坐标到底部的距离
            const paddingBottom = 30
            //大CD图片顶部到屏幕上部的距离
            const paddingTop = 80
            //大CD图片宽度，等于屏幕宽度的80%
            const width = window.innerWidth * 0.8
            //初始缩放比例
            const scale = targetWidth / width
            //mini播放器上cd图片中心坐标到大CD图片中心坐标的y轴距离
            const x = -(window.innerWidth/2 - paddingLeft)
            //mini播放器上cd图片中心坐标到大CD图片中心坐标的x轴距离
            const y = window.innerHeight - paddingTop - width/2 -paddingBottom
            return {
                x,
                y,
                scale
            }
        },
        //映射this.setFullScreen() 为 this.$store.commit('SET_FULL_SCREEN')
        //vuex提供的辅助函数使我们不必写多余的代码就可以在组件中提交Mutations
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST'
        }),
        ...mapActions([
          'savePlayHistory'
        ])
    },
    watch: {
        currentSong(newSong,oldSong) {
            if(!newSong.id){
              return
            }
            if(newSong.id === oldSong.id){
              return
            }
            if(this.currentLyric){
              this.currentLyric.stop()
              this.currentTime = 0
              this.playingLyric = ''
              this.currentLineNum = 0
            }
            //延时播放
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.$refs.audio.play()
                this.getLyric()
            }, 1000)          
        },
        playing(newPlaying){
            const audio = this.$refs.audio
            if(newPlaying){
                this.$nextTick(() => {
                    audio.play()
                })
            }else{
                audio.pause()
            }
        }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll,
      Playlist
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 20px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%

        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .time
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      img
        border-radius: 50%
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-playlist
        position: relative
        top: -2px
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0

@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>