import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  ALL_FIXTURES_FETCHED,
  CURRENT_ROUND_FETCHED,
  POST_PREDICTION,
  REMOVE_ALL_FIXTURES,
  UPDATE_PREDICTION,
  AllFixturesFetched,
  CurrentRoundFetched,
  PostPrediction,
  RemoveAllFixtures,
  UpdatePrediction,
} from './types';
import { StoreState } from '../types';
import { IPrediction } from '../../models/predictions.model';
import { ICurrentRound, TotoRound } from '../../models/toto.models';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { ThunkAction } from 'redux-thunk';

export const allFixturesFetched = (allFixtures: TotoRound[]): AllFixturesFetched => {
  return {
    type: ALL_FIXTURES_FETCHED,
    allFixtures,
  };
};

export const currentRoundFetched = (currentRound: ICurrentRound): CurrentRoundFetched => {
  return {
    type: CURRENT_ROUND_FETCHED,
    currentRound,
  };
};

export const postPrediction = (prediction: IPrediction): PostPrediction => {
  return {
    type: POST_PREDICTION,
    prediction,
  };
};

export const removeAllFixtures = (): RemoveAllFixtures => {
  return {
    type: REMOVE_ALL_FIXTURES,
  };
};

export const updatePrediction = (prediction: IPrediction): UpdatePrediction => {
  return {
    type: UPDATE_PREDICTION,
    prediction,
  };
};

export const changePrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
}: IPrediction): ThunkAction<void, StoreState, unknown, Action<string>> => async (dispatch: Dispatch) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.patch(
      `${apiUrl}/predictions/${fixtureId}`,
      {
        pGoalsHomeTeam,
        pGoalsAwayTeam,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    dispatch(setMessage('success', response.data.message));
    dispatch(updatePrediction(response.data.prediction));
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

export const fetchAllFixtures = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
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
};

export const fetchCurrentRound = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/rounds/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const currentRound = response.data;

    dispatch(currentRoundFetched(currentRound));
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

export const postNewPrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
}: IPrediction): ThunkAction<void, StoreState, unknown, Action<string>> => async (dispatch: Dispatch) => {
  dispatch(appLoading());
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
      },
    );

    dispatch(setMessage('success', response.data.message));
    dispatch(postPrediction(response.data.prediction));
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
