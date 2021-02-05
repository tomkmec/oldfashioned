import { emptyState } from '../state'

const key = "oldfashioned/state"

const storage = {
  loadState: () => { 
    const serializedState = localStorage.getItem(key);
    if (serializedState !== null) {
      try {
        return JSON.parse(serializedState);
      } catch (e) {
        console.error(
          `Failed to parse previously saved state from local storage. 
          Corrupted, or the format might have changed.
          Saving the state as '${key}-debug' for reference/debug`);
        localStorage.setItem(`${key}-debug`, serializedState);
      }
    }
    return emptyState;
  }
}

export default storage