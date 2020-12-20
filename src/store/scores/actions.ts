import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  REMOVE_ALL_SCORES,
  SCORES_FIXTURE_FETCHED,
  SCORES_ROUND_FETCHED,
  SCORES_TOTAL_TOTO_FETCHED,
  SCORES_TOTO_ROUND_FETCHED,
  FixtureWithScores,
  UserWithScore,
  RemoveAllScores,
  ScoresFixtureFetched,
  ScoresRoundFetched,
  ScoresTotalTotoFetched,
  ScoresTotoRoundFetched,
} from './types';
import { GetState } from '../types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

export const removeAllScores = (): RemoveAllScores => {
  return {
    type: REMOVE_ALL_SCORES,
  };
};

const scoresFixtureFetched = (
  fixture: FixtureWithScores
): ScoresFixtureFetched => {
  return {
    type: SCORES_FIXTURE_FETCHED,
    fixture,
  };
};

const scoresRoundFetched = (round: UserWithScore[]): ScoresRoundFetched => {
  return {
    type: SCORES_ROUND_FETCHED,
    round,
  };
};

const scoresTotalTotoFetched = (
  totalToto: UserWithScore[]
): ScoresTotalTotoFetched => {
  return {
    type: SCORES_TOTAL_TOTO_FETCHED,
    totalToto,
  };
};

const scoresTotoRoundFetched = (
  totoRound: UserWithScore[]
): ScoresTotoRoundFetched => {
  return {
    type: SCORES_TOTO_ROUND_FETCHED,
    totoRound,
  };
};

export const fetchScoresFixture = (id: number) => async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/fixtures/${id}`, {
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

export const fetchScoresRound = (id: number) => async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/rounds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const round = response.data.round;

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

export const fetchScoresTotalToto = () => async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/all`, {
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

export const fetchScoresTotoRound = (id: number) => async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/totorounds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const totoRound = response.data.totoRound;

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
