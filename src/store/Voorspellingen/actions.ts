import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ALL_FIXTURES_FETCHED,
  CURRENT_ROUND_FETCHED,
  AllFixturesFetched,
  CurrentRoundFetched,
  WedstrijdMetVoorspellingen,
  Game,
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