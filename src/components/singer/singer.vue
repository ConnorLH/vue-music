<template>
  <div class="singer">
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import {isChinese, getPinYinFirstCharacter} from 'common/js/pinyin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LIST = 10

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singers = res.singerList.data.singerlist
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        // 前十条放到热门里面
        list.forEach((item, index) => {
          if (isChinese(item.singer_name)) {
            item.firstCharacter = getPinYinFirstCharacter(item.singer_name, '-', false)
          } else {
            item.firstCharacter = item.singer_name
          }
          if (index < HOT_SINGER_LIST) {
            map.hot.items.push(new Singer({
              id: item.firstCharacter,
              name: item.singer_name,
              avatar: item.singer_pic
            }))
          }
          // 按照地区分类放进去
          const key = item.firstCharacter.substring(0, 1).toUpperCase()
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.firstCharacter,
            name: item.singer_name,
            avatar: item.singer_pic
          }))
        })
        return map
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
