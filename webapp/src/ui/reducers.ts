
import { combineReducers } from 'redux'
import NowPlayingReducer from './main/NowPlayingReducer'

export default combineReducers({
  nowPlaying: NowPlayingReducer
})