import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

export function getCall(url, reduce) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: 'FETCH_UPDATE', payload: true });
    return axios.get(url)
      .then((response) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        if (reduce) {
          dispatch({ type: reduce, payload: response.data });
        }
        return resolve();
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        return reject(err);
      });
  });
}

export function postCall(url, data, reduce) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: 'FETCH_UPDATE', payload: true });
    return axios.post(url, data)
      .then((response) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        if (reduce) {
          dispatch({ type: reduce, payload: response.data });
        }
        return resolve();
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        return reject(err);
      });
  });
}

export function putCall(url, data, reduce) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: 'FETCH_UPDATE', payload: true });
    return axios.put(url, data)
      .then((response) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        if (reduce) {
          dispatch({ type: reduce, payload: response.data });
        }
        return resolve();
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        return reject(err);
      });
  });
}

export function deleteCall(url) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: 'FETCH_UPDATE', payload: true });
    return axios.delete(url, { params: {} })
      .then((response) => {
        console.log(response);
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        return resolve();
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        return reject(err);
      });
  });
}

export function socketInit() {
  return dispatch => new Promise(() => {
    socket.on('tick', (tick) => {
      dispatch({ type: 'SOCKET_TICK', payload: tick });
    });
    socket.on('newBattle', (battle) => {
      dispatch({ type: 'NEW_BATTLE_DETECTED', payload: battle });
    });
    socket.on('delBattle', (battle) => {
      dispatch({ type: 'DEL_BATTLE_DETECTED', payload: battle });
    });
    socket.emit('subscribeToTick');
  });
}
