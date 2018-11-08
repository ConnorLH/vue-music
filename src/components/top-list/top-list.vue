<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getTopListDetail} from 'api/rank'
  import {createRankSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getTopListDetail()
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    methods: {
      _getTopListDetail() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getTopListDetail(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        console.log(list)
        let ret = []
        list.forEach((musicData) => {
          if (musicData.Franking_value) {
            ret.push(createRankSong(musicData))
          }
        })
        console.log(ret)
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
