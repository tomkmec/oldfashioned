import State, { emptyState } from '../state'
import * as log from 'loglevel';

const key = "oldfashioned/state"

export default {
  loadState: () => { 
    const serializedState = localStorage.getItem(key);
    if (serializedState !== null) {
      try {
        return JSON.parse(serializedState);
      } catch (e) {
        log.error(
          `Failed to parse previously saved state from local storage. 
          Corrupted, or the format might have changed.
          Saving the state as '${key}-debug' for reference/debug`);
        localStorage.setItem(`${key}-debug`, serializedState);
      }
    }
    return emptyState;
  }
}