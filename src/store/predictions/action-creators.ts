import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API_URL } from '../../config/apiUrl';
import { IPrediction } from '../../models/predictions.model';
import { AppStateActions } from '../appState/action-types';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions';
import { StoreState } from '../types';
import { PredictionActions } from './action-types';
import {
  postPrediction,
  storeAllFixtures,
  storeCurrentRound,
  updatePrediction,
} from './actions';

export const changePrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
}: IPrediction): ThunkAction<
  void,
  StoreState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch<AppStateActions | PredictionActions>) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.patch(
      `${API_URL}/predictions/${fixtureId}`,
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

export const fetchAllFixtures = (): ThunkAction<
  void,
  StoreState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch<AppStateActions | PredictionActions>) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/rounds/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const allFixtures = response.data;

    dispatch(storeAllFixtures(allFixtures));
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

export const fetchCurrentRound = (): ThunkAction<
  void,
  StoreState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch<AppStateActions | PredictionActions>) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/rounds/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const currentRound = response.data;

    dispatch(storeCurrentRound(currentRound));
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
}: IPrediction): ThunkAction<
  void,
  StoreState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch<AppStateActions | PredictionActions>) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.post(
      `${API_URL}/predictions`,
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
