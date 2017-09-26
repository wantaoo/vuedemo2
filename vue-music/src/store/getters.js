//getters：从store中的state中派生出的一些状态
// getters: {
//     doneTodos: state => {
//       return state.todos.filter(todo => todo.done)
//     }
// }
export const singer = state => state.singer;
//ES5写法
// function singer(state){
//     return state.singer
// }
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory


//通过state里的playList和currentIndex计算出currentSong状态
export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
