import {SourcePlugin, Source, PlayerInitializationReqiurements, PlayedPlaylistEntry, Suggestion, PlaylistEntry} from '../api';

const MockSourcePlugin: SourcePlugin = {
  metadata: {
    id: 'of.source.mock',
    name: 'Mock Source',
    description: 'Some random items for playlist',
    iconURL: 'https://via.placeholder.com/150',
    requiredPlayerCapabilities: ['mock'],
    sourceConfigurationItems: [],
    defaultSceneConfiguration: {}
  },
  getInstance: async (sourceConfig: any, id: string) => {
    return new MockSource(id);
  }
}

class MockSource implements Source {
  coreContent = true;
  metadata = MockSourcePlugin.metadata;
  playerInitializationRequirements = {} as PlayerInitializationReqiurements;
  sensitiveContent = false;
  timeSensitive = false;

  constructor(public id: string) {};

  async getSuggestions(
    recentlyPlayed: PlayedPlaylistEntry[], 
    /** configuration for currently selected scene */
    currenConfiguration: object,
    breakingOnly: boolean,
    //activeModifiers: Modifier[], 
    clientTime: string): Promise<Suggestion[]> {
      return [];
    }

  async setFavorite(entry: PlaylistEntry, favorite: boolean): Promise<boolean> {
    return false;
  };

}

export default MockSourcePlugin;