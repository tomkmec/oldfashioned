import { createReducer } from '@reduxjs/toolkit'
import * as action from './PlaylistActions'
import { emptyState } from '../../state'

const reducer = createReducer(emptyState.nowPlaying, (builder) => {
  builder.addCase(action.pause, (state, action) => { state.paused = true })
  builder.addCase(action.play, (state, action) => { state.paused = false })
})

export default reducer;