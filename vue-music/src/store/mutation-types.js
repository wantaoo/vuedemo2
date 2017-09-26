// 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
// 这样可以使 linter 之类的工具发挥作用，
// 同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
export const SET_SINGER = 'SET_SINGER'

export const SET_PLAYING_STATE = 'SET_PLAYING_STATE'

export const SET_FULL_SCREEN = 'SET_FULL_SCREEN'

export const SET_PLAYLIST = 'SET_PLAYLIST'

export const SET_SEQUENCE_LIST = 'SET_SEQUENCE_LIST'

export const SET_PLAY_MODE = 'SET_PLAY_MODE'

export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'

export const SET_DISC = 'SET_DISC'

export const SET_TOP_LIST = 'SET_TOP_LIST'

export const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY'

export const SET_PLAY_HISTORY = 'SET_PLAY_HISTORY'

export const SET_FAVORITE_LIST = 'SET_FAVORITE_LIST'