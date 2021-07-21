import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API_URL } from '../../config/apiUrl';
import { AppStateActions } from '../appState/action-types';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions';
import { StoreState } from '../types';
import { ScoresActions } from './action-types';
import {
  storePlayerScores,
  storeScoresFixture,
  storeScoresRound,
  storeScoresTotalToto,
  storeScoresTotoRound,
} from './actions';

export const fetchScoresFixture = (
  id: number,
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<AppStateActions | ScoresActions>,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/fixtures/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(storeScoresFixture(response.data.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const fetchScoresRound = (
  id: number,
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<AppStateActions | ScoresActions>,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/rounds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const round = response.data;

    dispatch(storeScoresRound(round));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const fetchScoresTotalToto = (): ThunkAction<
  void,
  StoreState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch<AppStateActions | ScoresActions>) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/totaltoto`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(storeScoresTotalToto(response.data.data.scoresTotalToto));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const fetchScoresTotoRound = (
  id: number,
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<AppStateActions | ScoresActions>,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/totorounds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const totoRound = response.data;

    dispatch(storeScoresTotoRound(totoRound));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const fetchPlayerScores = (
  id: number,
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<AppStateActions | ScoresActions>,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/players/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(storePlayerScores(response.data.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', error.message));
    }
    dispatch(appDoneLoading());
  }
};
