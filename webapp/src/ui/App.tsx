import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import State from '../state'

import { togglePlay } from './main/PlaylistActions'

const mapState = (state: State) => ({
  playing: state.nowPlaying.playing
})

const mapDispatch = {
  togglePlay: togglePlay
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

function App(props: Props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={props.togglePlay} >{props.playing?'>':'||'}</button>
      </header>
    </div>
  );
}

export default connector(App);
