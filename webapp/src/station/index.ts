import State from '../state';
import implementation from './station'

export default interface Station {
  togglePlay: () => Promise<boolean>;
  toggleFav: (id: string) => Promise<boolean>;
}

export function createStation(state: State): Station {
  return new implementation(state);
}