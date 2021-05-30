import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { apiUrl } from '../../config/constants';
import { ISignUpCredentials } from '../../models/credentials.model';
import { ActionTypeAppState } from '../appState/action-types';
import { AppStateActions } from '../appState/actions';
import { setMessage } from '../appState/actions-creators';
import { StoreState } from '../types';
import { ActionTypePlayers } from './action-types';
import { PlayersActions, ResetPlayers } from './actions';

export const addPlayer = (
  signUpCredentials: ISignUpCredentials,
): ThunkAction<void, StoreState, unknown, Action<string>> => {
  const { userName, firstName, lastName, email, password, phoneNumber, admin, totaalToto, teamId } = signUpCredentials;
  return async (dispatch: Dispatch<PlayersActions | AppStateActions>) => {
    dispatch({ type: ActionTypeAppState.APP_LOADING });
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.post(
        `${apiUrl}/signup`,
        {
          userName,
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          admin,
          totaalToto,
          teamId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      dispatch({ type: ActionTypePlayers.ADD_NEW_PLAYER, payload: response.data.userData });
      dispatch({
        type: ActionTypeAppState.SET_MESSAGE,
        payload: {
          severity: 'success',
          text: response.data.message,
        },
      });
      dispatch({
        type: ActionTypeAppState.APP_DONE_LOADING,
      });
    } catch (error) {
      handleError(error);
    }
  };
};

export const resetPlayers = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<ResetPlayers>,
) => {
  dispatch({ type: ActionTypePlayers.RESET_PLAYERS });
};

export const fetchAllPlayers = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<PlayersActions | AppStateActions>,
) => {
  dispatch({ type: ActionTypeAppState.APP_LOADING });
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const players = response.data;

    dispatch({ type: ActionTypePlayers.FETCH_ALL_PLAYERS, payload: players });
    dispatch({
      type: ActionTypeAppState.APP_DONE_LOADING,
    });
  } catch (error) {
    handleError(error);
  }
};

export const fetchPlayerProfile = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<PlayersActions | AppStateActions>,
) => {
  dispatch({ type: ActionTypeAppState.APP_LOADING });
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const playerProfile = response.data;

    dispatch({ type: ActionTypePlayers.FETCH_PLAYER_PROFILE, payload: playerProfile });
    dispatch({
      type: ActionTypeAppState.APP_DONE_LOADING,
    });
  } catch (error) {
    handleError(error);
  }
};

export const fetchPlayerScores = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<PlayersActions | AppStateActions>,
) => {
  dispatch({ type: ActionTypeAppState.APP_LOADING });
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/players/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const scoresPlayer = response.data;

    dispatch({ type: ActionTypePlayers.FETCH_PLAYER_SCORES, payload: scoresPlayer });
    dispatch({
      type: ActionTypeAppState.APP_DONE_LOADING,
    });
  } catch (error) {
    handleError(error);
  }
};

export const playerDelete = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<PlayersActions | AppStateActions>,
) => {
  dispatch({ type: ActionTypeAppState.APP_LOADING });
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.delete(`${apiUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: ActionTypePlayers.DELETE_PLAYER, payload: id });
    dispatch(setMessage('success', response.data.message));
    dispatch({
      type: ActionTypeAppState.APP_DONE_LOADING,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updatePlayerAdminStatus = (
  id: number,
  admin: boolean,
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<PlayersActions | AppStateActions>,
) => {
  dispatch({ type: ActionTypeAppState.APP_LOADING });
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.patch(
      `${apiUrl}/users/${id}/admin`,
      { admin },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const player = response.data.updatedUser;

    dispatch({ type: ActionTypePlayers.UPDATE_ADMIN_STATUS, payload: player });
    dispatch(setMessage('success', response.data.message));
    dispatch({
      type: ActionTypeAppState.APP_DONE_LOADING,
    });
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: {
  response: { data: { message: string } };
  message: string;
}): ThunkAction<void, StoreState, unknown, Action<string>> => async (dispatch: Dispatch<AppStateActions>) => {
  if (error.response) {
    console.log(error.response.data.message);
    dispatch({
      type: ActionTypeAppState.SET_MESSAGE,
      payload: {
        severity: 'error',
        text: error.response.data.message,
      },
    });
  } else {
    console.log(error.message);
    dispatch({
      type: ActionTypeAppState.SET_MESSAGE,
      payload: {
        severity: 'error',
        text: error.message,
      },
    });
  }
  dispatch({
    type: ActionTypeAppState.APP_DONE_LOADING,
  });
};
