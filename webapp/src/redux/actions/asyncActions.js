import axios from 'axios';

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
        console.log(err);
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
        console.log(err);
        dispatch({ type: 'FETCH_UPDATE', payload: false });
        return reject(err);
      });
  });
}
