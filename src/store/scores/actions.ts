import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API_URL } from '../../config/constants';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions';
import { StoreState } from '../types';
import {
  FixtureWithScores,
  REMOVE_ALL_SCORES,
  RemoveAllScores,
  Scores,
  SCORES_FIXTURE_FETCHED,
  SCORES_ROUND_FETCHED,
  SCORES_TOTAL_TOTO_FETCHED,
  SCORES_TOTO_ROUND_FETCHED,
  ScoresFixtureFetched,
  ScoresRoundFetched,
  ScoresTotalTotoFetched,
  ScoresTotoRoundFetched,
  UserWithScore,
} from './types';

export const removeAllScores = (): RemoveAllScores => {
  return {
    type: REMOVE_ALL_SCORES,
  };
};

export const scoresFixtureFetched = (fixture: FixtureWithScores): ScoresFixtureFetched => {
  return {
    type: SCORES_FIXTURE_FETCHED,
    fixture,
  };
};

export const scoresRoundFetched = (round: Scores): ScoresRoundFetched => {
  return {
    type: SCORES_ROUND_FETCHED,
    round,
  };
};

export const scoresTotalTotoFetched = (totalToto: UserWithScore[]): ScoresTotalTotoFetched => {
  return {
    type: SCORES_TOTAL_TOTO_FETCHED,
    totalToto,
  };
};

export const scoresTotoRoundFetched = (totoRound: Scores): ScoresTotoRoundFetched => {
  return {
    type: SCORES_TOTO_ROUND_FETCHED,
    totoRound,
  };
};

export const fetchScoresFixture = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/fixtures/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const fixture = response.data;

    dispatch(scoresFixtureFetched(fixture));
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

export const fetchScoresRound = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/rounds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const round = response.data;

    dispatch(scoresRoundFetched(round));
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

export const fetchScoresTotalToto = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const totalToto = response.data;

    dispatch(scoresTotalTotoFetched(totalToto));
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

export const fetchScoresTotoRound = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/scores/totorounds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const totoRound = response.data;

    dispatch(scoresTotoRoundFetched(totoRound));
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
