<template>
  <transition name="slide">
    <music-list :songs="songList" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail, getMusic} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import musicList from 'components/music-list/music-list'

  export default {
    data() {
      return {
        songList: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
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
      _getDetail() {
        if (!this.singer.mid) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.mid).then((res) => {
          if (res.code === ERR_OK) {
            this.songList = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            getMusic(musicData.songmid).then((res) => {
              const svley = res.data.items
              const songVkey = svley[0].vkey
              ret.push(createSong(musicData, songVkey))
            })
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

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    // 这里代表起始位置是右移了100%，所以进入动画会从右往左移
    transform: translate3d(100%, 0, 0)
</style>
