<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {createRecommendSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.songListDesc
      },
      bgImage() {
        return this.disc.picUrl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        getSongList(this.disc.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        // console.log(list)
        let ret = []
        list.forEach((musicData) => {
            if (musicData.id && musicData.album.id) {
            ret.push(createRecommendSong(musicData))
          }
        })
        // console.log(ret)
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>
