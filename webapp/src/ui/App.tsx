import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import State from '../state'

import {play} from './main/PlaylistActions'
import { createAsyncThunk } from '@reduxjs/toolkit';

const playThunk = createAsyncThunk('station/play', async() => {
  console.log('p')
  //player.play()
})

const mapState = (state: State) => ({
  paused: state.nowPlaying.paused
})

const mapDispatch = {
  play: () => ({ type: play.type }),
  play2: playThunk
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

function App(props: Props) {
  const dispatch = useDispatch();
  
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
        <button onClick={props.play2} >{props.paused?'>':'||'}</button>
      </header>
    </div>
  );
}

export default connector(App);
