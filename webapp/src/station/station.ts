import Station from '.';
import State from '../state';

export default class StationImpl implements Station {
  private playing = false;

  constructor(previousState: State) {

  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  async togglePlay() {
    await this.delay(500)
    this.playing = !this.playing
    return this.playing
  }

}