import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PlaylistEntry } from '../../plugins/api';

import Station from '../../station'
var station: Station

export function _inject(s: Station) {
  station = s;
}

/**
 * Rule of thumb for actions vs. thunks:
 * - store CAN be source of truth (playlist, history, etc.) => actions
 * - store only reflects the actual source of truth (paused, favorited) => thunks
 */

export const clearPlaylist = createAction("playlist/clear");
export const replacePlaylist = createAction<PlaylistEntry[]>("playlist/replaceAll");
export const appendPlaylist = createAction<PlaylistEntry[]>("playlist/appendAll");
export const removeFromPlaylist = createAction<string>("playlist/remove");

export const toggleFav = createAsyncThunk("playlist/toggleFav", async (id: string) => {
  return station.toggleFav(id)
});

export const togglePlay = createAsyncThunk("playlist/togglePlay", async () => {
  return station.togglePlay()
});

