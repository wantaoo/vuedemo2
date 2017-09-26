<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/javascript">
    import MusicList from '../music-list/music-list.vue'
    import {mapGetters} from 'vuex'
    import {getMusicList} from '../../api/rank.js'
    import {ERR_OK} from '../../api/config.js'
    import {createSong} from '../../common/js/song.js'

    export default {
        computed: {
            title(){
                return this.topList.topTitle
            },
            bgImage(){
                if (this.songs.length) {
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters([
                'topList'
            ])
        },
        created() {
            this._getMusicList()
        },
        data(){
            return {
                songs: [],
                rank: true
            }
        },
        methods: {
            _getMusicList(){
                getMusicList(this.topList.id).then((res) => {
                    if(res.code === ERR_OK){
                        this.songs = this._normalizeSongs(res.songlist)
                        console.log(this.topList)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    const musicData = item.data
                    if(musicData.songid && musicData.albumid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>