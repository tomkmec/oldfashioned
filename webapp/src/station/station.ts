import Station from '.';
import State from '../state';

export default class StationImpl implements Station {
  private playing = false;
  private fav = false;

  constructor(previousState: State) {
    this.playing = previousState.nowPlaying.playing;
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async togglePlay() {
    await this.delay(500)
    this.playing = !this.playing
    return this.playing
  }

  async toggleFav(id: string) {
    console.log(id, this.fav)
    await this.delay(500)
    this.fav = !this.fav
    return this.fav
  }

}