<template>
	<div class="rank" ref="rank">
        <scroll ref="toplist" :data="topList" class="toplist">
            <ul>
                <li class="item" v-for="item in topList" @click="selectItem(item)">
                    <div class="icon">
                        <img v-lazy="item.picUrl" width="100" height="100">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song, index) in item.songList">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>      
        </scroll>
        <router-view></router-view>
	</div>
</template>

<script type="text/javascript">
    import {getTopList} from '../../api/rank.js'
    import {ERR_OK} from '../../api/config.js'
    import Scroll from '../../base/scroll/scroll.vue'
    import Loading from '../../base/loading/loading.vue'
    import {playlistMixin} from '../../common/js/mixin.js'
    import {mapMutations} from 'vuex'

	export default{
        created(){
            this._getTopList()
        },
        data() {
            return {
                topList: []
            }
        },
        methods: {
            //处理出现mini播放器的情况下底部自适应
            handlePlaylist(playlist){
                const bottom = playlist.length ? '60px' : ''
                this.$refs.rank.style.bottom = bottom
                this.$refs.toplist.refresh()
                
            },
            selectItem(item){
                this.$router.push({
                    path:  `/rank/${item.id}`
                })
                this.setTopList(item)
            },
            _getTopList(){
                getTopList().then((res) => {
                    if(res.code === ERR_OK){
                        this.topList = res.data.topList
                    }
                })
            },
            ...mapMutations({
                setTopList: 'SET_TOP_LIST'
            })
        },
        components: {
            Scroll,
            Loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding: 10px 0 10px 5px
        height: 100px
        box-shadow:3px 2px 2px #b39e90
        margin-bottom:5px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>