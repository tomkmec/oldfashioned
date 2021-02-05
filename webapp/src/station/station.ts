import Station from '.';
import State from '../state';
import * as log from 'loglevel';

export default class StationImpl implements Station {
  constructor(previousState: State) {

  }

  play() {
    log.info("Play");
  }

  pause() {
    log.info("Pause");
  }

}