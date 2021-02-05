import State from '../state';
import implementation from './station'

export default interface Station {
  pause: () => void;
  play: () => void
}

export function createStation(state: State): Station {
  return new implementation(state);
}