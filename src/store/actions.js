import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

// 选择播放
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  // 随机播放列表时点击某首歌曲，需要重新洗一次，在其中找到点击的这一首
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 随机播放
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, shuffle(list))
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 搜索页点击后添加一首歌曲
export const insertSong = function ({commit, state}, song) {
  // 这里为了避免直接修改由vuex管理的数据（这个playlist），应该复制一份操作
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲，返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，在当前歌曲的后面插入，索引加1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经有这首歌了，那就删掉旧的
  if (fpIndex > -1) {
    // 如果原来的歌曲index在现在插入位置之前（或者刚好就是我们插入的这个位置，即当前播放歌曲刚好就是我们要新加的这首歌），之前记录的位置在插入后没有变化
    if (currentIndex >= fpIndex) {
      playlist.splice(fpIndex, 1)
      // 删除后插入位置已经变了，需要重新设置
      currentIndex--
    } else {
      // 如果原来的歌曲index在现在插入位置之后，那么前面插入的操作已经将之前记录的这个位置往下顶了1
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // 当前播放歌曲在哪个位置，然后加1就是我们插入的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  // 查找我们要插入的这首歌有没有在播放列表中
  let fsIndex = findIndex(sequenceList, song)

  // 插入这首歌到当前索引位置
  sequenceList.splice(currentSIndex, 0, song)
  // 如果已经有这首歌了，那就删掉旧的
  if (fsIndex > -1) {
    // 如果原来的歌曲index在现在插入位置之前（或者刚好就是我们插入的这个位置，即当前播放歌曲刚好就是我们要新加的这首歌），之前记录的位置在插入后没有变化
    if (currentSIndex >= fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      // 如果原来的歌曲index在现在插入位置之后，那么前面插入的操作已经将之前记录的这个位置往下顶了1
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 保存搜索历史
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除单条搜索历史
export const deleteSearchItem = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清空所有搜索历史
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
