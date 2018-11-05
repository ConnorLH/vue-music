export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceLlist = state => state.sequenceLlist

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const cuttentSong = state => {
  return state.playlist[state.currentIndex] || {}
}
