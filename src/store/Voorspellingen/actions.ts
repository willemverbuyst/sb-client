import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ALL_FIXTURES_FETCHED,
  CURRENT_ROUND_FETCHED,
  POST_PREDICTION,
  REMOVE_ALL_FIXTURES,
  AllFixturesFetched,
  CurrentRoundFetched,
  PostPrediction,
  RemoveAllFixtures,
  WedstrijdMetVoorspellingen,
  Game,
  Prediction,
} from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { GetState } from '../types';

const allFixturesFetched = (allFixtures: Game[]): AllFixturesFetched => {
  return {
    type: ALL_FIXTURES_FETCHED,
    allFixtures,
  };
};

const currentRoundFetched = (
  currentRound: WedstrijdMetVoorspellingen[]
): CurrentRoundFetched => {
  return {
    type: CURRENT_ROUND_FETCHED,
    currentRound,
  };
};

const postPrediction = (prediction: Prediction): PostPrediction => {
  return {
    type: POST_PREDICTION,
    prediction,
  };
};

const removeAllFixtures = (): RemoveAllFixtures => {
  return {
    type: REMOVE_ALL_FIXTURES,
  };
};

export const fetchAllFixtures = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (!getState().voorspellingenState.allFixtures) {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.get(`${apiUrl}/rounds/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allFixtures = response.data;

      dispatch(allFixturesFetched(allFixtures));
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
  }
};

export const fetchCurrentRound = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (!getState().voorspellingenState.currentRound) {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.get(`${apiUrl}/rounds/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const round = response.data;

      dispatch(currentRoundFetched(round));
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
  }
};

export const postNewPrediction = (
  pGoalsHomeTeam: number,
  pGoalsAwayTeam: number,
  fixtureId: number
) => {
  return async (dispatch: any, _getState: GetState) => {
    dispatch(appLoading());
    dispatch(postPrediction({ pGoalsAwayTeam, pGoalsHomeTeam, fixtureId }));
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.post(
        `${apiUrl}/predictions`,
        {
          pGoalsHomeTeam,
          pGoalsAwayTeam,
          fixtureId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(setMessage('success', response.data.message));
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
};

export const removeFixtures = () => removeAllFixtures();
