import { createAction } from '@reduxjs/toolkit'
import { PlaylistEntry } from '../../plugins/api';

export const clearPlaylist = createAction("playlist/clear");
export const replacePlaylist = createAction<PlaylistEntry[]>("playlist/replaceAll");
export const appendPlaylist = createAction<PlaylistEntry[]>("playlist/appendAll");
export const removeFromPlaylist = createAction<string>("playlist/remove");
export const toggleFavorite = createAction<string>("playlist/toggleFav");
export const pause = createAction("playlist/pause");
export const play = createAction("playlist/play");
export const skip = createAction("skip");

