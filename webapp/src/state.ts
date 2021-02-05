import * as api from './plugins/api'

interface State {
  nowPlaying: {
    playing: boolean,
    entry: api.PlaylistEntry
  },
  playlist: api.PlaylistEntry[],
  playHistory: api.PlayedPlaylistEntry[],
  configuration: {
    sources: {
      id: string, pluginId: string, name: string
    }[],
    scenes: {
      key: string, name: string
    }[]
  }
}

const emptyState: State = {
  nowPlaying: {
    playing: false,
    entry: {
      showInPlaylist: false,
      sourceId: '',
      metadata: {
        id: '',
        name: '',
        description: '',
        iconURL: '',
        defaultSceneConfiguration: {},
        sourceConfigurationItems: [],
        requiredPlayerCapabilities: []
      },
      entry: {
        type: 'announcement',
        language: '',
        text: '',
        canFavorite: false, isFavorite: false
      }
    }
  },
  playHistory: [],
  playlist: [],
  configuration: {
    sources: [],
    scenes: []
  }
}

export default State;
export { emptyState }