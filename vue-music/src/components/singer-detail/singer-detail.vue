<template>
	<transition name="slide">
		<music-list :bg-image="bgImage" :title="title" :songs="songs">
			
		</music-list>
	</transition>
</template>

<script type="text/javascript">
import {mapGetters} from 'vuex'
import {getSingerDetail} from '../../api/singer.js'
import {createSong} from '../../common/js/song.js'
import {ERR_OK} from '../../api/config.js'
import musicList from '../../components/music-list/music-list.vue'
	export default{
		data(){
			return {
				songs: []
			}
		},
		computed: {
			title(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			this._getDetail()
		},
		methods: {
			_getDetail(){
				if(!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if( res.code === ERR_OK ){
						this.songs = this._normalizeSongs(res.data.list)
						console.log(this.songs)
					}
				})
			 },
			_normalizeSongs(list) {
			    let ret = []
			    list.forEach((item) => {
			        let {musicData} = item
			        if (musicData.songid && musicData.albummid) {
			          ret.push(createSong(musicData))
			        }
			    })
			    return ret
			}
		},
		components: {
			musicList
		}
	}
</script>

<style lang="stylus">
	@import "../../common/stylus/variable.styl"
	.singer-detail
		position: fixed
		z-index: 100
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: $color-background
	.slide-enter-active,.slide-leave-active
		transition: all 0.3s
	.slide-enter,.slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>