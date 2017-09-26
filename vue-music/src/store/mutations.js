//https://vuex.vuejs.org/zh-cn/mutations.html
//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
//Vuex 中的 mutations 非常类似于事件：
//每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
//这个回调函数就是我们实际进行状态更改的地方，并且它会接受""" state """作为第一个参数
//第二个参数"""payload()"""就是要修改成为的状态，类型与state.js定义的状态类型相同

import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag){
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag){
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list){
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list){
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode){
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, list){
    state.currentIndex = list
  },
  [types.SET_DISC](state, disc){
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList){
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history){
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history){
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list){
    state.favoriteList = list
  }
}

export default mutations