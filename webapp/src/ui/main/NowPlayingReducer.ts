import { createReducer } from '@reduxjs/toolkit'
import * as action from './PlaylistActions'
import { emptyState } from '../../state'

const reducer = createReducer(emptyState.nowPlaying, (builder) => {
  builder.addCase(action.togglePlay.fulfilled, (state, action) => { 
    state.playing = action.payload;
  })
})

export default reducer;