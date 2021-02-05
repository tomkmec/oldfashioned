interface TrackInfo {
  name: string;
  artists: {
    name: string;
  }[];
  album?: {
    name: string;
    release_date: string;
  }
}

interface Track extends TrackInfo {
  type: "track";
  id: string;

  description: string;
  duration: number; // in milliseconds
  trackIconURL?: string;
  canFavorite: boolean;
  isFavorite: boolean;
}

interface Announcement {
  type: "announcement";

  language: string;
  text: string;
  canFavorite: false;
  isFavorite: false;
}

interface Episode {
  type: "episode";
  id: string;

  description: string;
  duration: number; // in milliseconds
  trackIconURL?: string;
  canFavorite: boolean;
  isFavorite: boolean;
}

export type Entry = Track | Episode | Announcement

export interface Suggestion {
  entry: Entry;
  /** ISO 8601 Date and time - e.g. 2020-11-21T09:23:17+00:00 */
  expires?: string; 
  breaking: boolean;
}

export interface PlaylistEntry {
  entry: Entry
  sourceId: string;
  metadata: SourceMetadata;
  showInPlaylist: boolean;
}

export interface PlayedPlaylistEntry extends PlaylistEntry {
  /** ISO 8601 Date and time - e.g. 2020-11-21T09:23:17+00:00 */
  from: string;
  /** undefied means still playing. ISO 8601 Date and time - e.g. 2020-11-21T09:23:17+00:00 */
  to?: string;
  paused: number; // milliseconds of total pause time
  played_over: number; // milliseconds of total time this has bee played over
}


export enum ConfigurationItemType {
  text, number, switch, slider, sliderRange, textList, checkboxList, select
}

export interface ConfigurationItem<T> {
  type: ConfigurationItemType;
  key: string;
  defaultLabel: string;
  defaultDescription?: string;  
  value?: T; 
}

export class CIText implements ConfigurationItem<string> {
  type = ConfigurationItemType.text;
  constructor(readonly key: string, readonly defaultLabel: string, readonly defaultDescription?: string) {}
}

export class CISlider implements ConfigurationItem<number> {
  type = ConfigurationItemType.slider;
  constructor(readonly key: string, readonly defaultLabel: string, public readonly min: number, public readonly max: number, readonly defaultDescription?: string) {}
}

export class CIRangeSlider implements ConfigurationItem<[number, number]> {
  type = ConfigurationItemType.sliderRange;
  constructor(readonly key: string, readonly defaultLabel: string, public readonly min: number, public readonly max: number, readonly defaultDescription?: string) {}
}

export interface SourceMetadata {
  id: string;
  name: string;
  description: string;
  requiredPlayerCapabilities: string[];
  iconURL: string;
  
  sourceConfigurationItems: ConfigurationItem<any>[];

  defaultSceneConfiguration: Partial<Record<string, object>>;
}

export interface SourcePlugin {
  metadata: SourceMetadata;
  getInstance(sourceConfiguration: any, id: string): Promise<Source>;
}

export interface Source {
  id: string;
  metadata: SourceMetadata;
  sensitiveContent: boolean;
  timeSensitive: boolean; // can generate a time-sensitive (breaking) content, such as news, stock muves, reminders
  coreContent: boolean; // can generate core content such as music or podcasts

  playerInitializationRequirements: PlayerInitializationReqiurements;
  onPlayerInitialized?: (playerName: string, initializationResults: PlayerInitializationResults) => void;

  getSuggestions(
    recentlyPlayed: PlayedPlaylistEntry[], 
    /** configuration for currently selected scene */
    currenConfiguration: object,
    breakingOnly: boolean,
    //activeModifiers: Modifier[], 
    clientTime: string): Promise<Suggestion[]>

  setFavorite(entry: PlaylistEntry, favorite: boolean): Promise<boolean>;
}

export interface PlayerInitializationReqiurements {
  playerId: string
}

export interface PlayerInitializationResults {
}

export interface PlayerMetadata {
  id: string;
  name: string;
  capabilities: string[];
}

export interface PlayerPlugin {
  metadata: PlayerMetadata;
  getInstance(requirements: PlayerInitializationReqiurements[], configuration: any): Promise<Player>;
}

export interface Player {
  playerMetadata: PlayerMetadata;
  initializationResults: PlayerInitializationResults;
  onStatusChange: (listener: (paused: boolean, pos?: number) => void) => void;
  play(track: Track, onFinish: Function): void;
  togglePause(): void;
  skip(): void;
}

export interface SpeechPlayer extends Player {
  speaksLanguages: string[];
  estimateSpeechDuration(pe: PlaylistEntry): number;
}

export abstract class AbstractPlayer {
  listeners: ((paused: boolean, pos?: number) => void)[] = [];
  onStatusChange(listener: (paused: boolean, pos?: number) => void) {
    this.listeners.push(listener);
  };
  broadcastStatusChange(paused: boolean, pos?: number) {
    this.listeners.forEach(l => l(paused, pos));
  }
  estimateSpeechDuration(pe: PlaylistEntry) {
    return 0;
  }
}

