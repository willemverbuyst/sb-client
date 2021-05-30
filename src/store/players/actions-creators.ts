import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { apiUrl } from '../../config/constants';
import { ISignUpCredentials } from '../../models/credentials.model';
import { ActionTypeAppState } from '../appState/action-types';
import { AppStateActions } from '../appState/actions';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions-creators';
import { StoreState } from '../types';
import { ActionTypePlayers } from './action-types';
import {
  AddNewPlayer,
  DeletePlayer,
  FetchPlayerProfile,
  FetchPlayerScores,
  PlayersActions,
  ResetPlayers,
  UpdateAdminStatus,
} from './actions';

export const addPlayer = (
  signUpCredentials: ISignUpCredentials,
): ThunkAction<void, StoreState, unknown, Action<string>> => {
  const { userName, firstName, lastName, email, password, phoneNumber, admin, totaalToto, teamId } = signUpCredentials;
  return async (dispatch: Dispatch) => {
    dispatch(appLoading());
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

      dispatch<AddNewPlayer>({ type: ActionTypePlayers.ADD_NEW_PLAYER, payload: response.data.userData });
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

export const fetchPlayerProfile = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const playerProfile = response.data;

    dispatch<FetchPlayerProfile>({ type: ActionTypePlayers.FETCH_PLAYER_PROFILE, payload: playerProfile });
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

export const fetchPlayerScores = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/players/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const scoresPlayer = response.data;

    dispatch<FetchPlayerScores>({ type: ActionTypePlayers.FETCH_PLAYER_SCORES, payload: scoresPlayer });
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

export const playerDelete = (id: number): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.delete(`${apiUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch<DeletePlayer>({ type: ActionTypePlayers.DELETE_PLAYER, payload: id });
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

export const updatePlayerAdminStatus = (
  id: number,
  admin: boolean,
): ThunkAction<void, StoreState, unknown, Action<string>> => async (dispatch: Dispatch) => {
  dispatch(appLoading());
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

    dispatch<UpdateAdminStatus>({ type: ActionTypePlayers.UPDATE_ADMIN_STATUS, payload: player });
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
