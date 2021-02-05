import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import rootReducer from './ui/reducers'

import persistence from './persistence/localStorage'

import {createStation} from './station'

import thunkMiddleware from 'redux-thunk'
import { createAsyncThunk } from '@reduxjs/toolkit';


async function init() {
  const storedState = await persistence.loadState();
  const player = createStation(storedState);
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
    preloadedState: storedState
  });
/*  
  const playThunk = createAsyncThunk('station/play', async() => {
    console.log('p')
    player.play()
  })

  createAsyncThunk('station/pause', async() => {
    console.log('pa')
    player.pause()
  })
*/
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
