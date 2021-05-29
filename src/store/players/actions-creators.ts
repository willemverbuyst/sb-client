import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { apiUrl } from '../../config/constants';
import { ISignUpCredentials } from '../../models/credentials.model';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions';
import { StoreState } from '../types';
import { ActionType } from './action-types';
import {
  AddNewPlayer,
  DeletePlayer,
  FetchAllPlayers,
  FetchPlayerProfile,
  FetchPlayerScores,
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

      dispatch<AddNewPlayer>({ type: ActionType.ADD_NEW_PLAYER, payload: response.data.userData });
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

export const resetPlayers = (): ResetPlayers => {
  return { type: ActionType.RESET_PLAYERS };
};

export const fetchAllPlayers = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const players = response.data;

    dispatch<FetchAllPlayers>({ type: ActionType.FETCH_ALL_PLAYERS, payload: players });
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

    dispatch<FetchPlayerProfile>({ type: ActionType.FETCH_PLAYER_PROFILE, payload: playerProfile });
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

    dispatch<FetchPlayerScores>({ type: ActionType.FETCH_PLAYER_SCORES, payload: scoresPlayer });
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

    dispatch<DeletePlayer>({ type: ActionType.DELETE_PLAYER, payload: id });
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

    dispatch<UpdateAdminStatus>({ type: ActionType.UPDATE_ADMIN_STATUS, payload: player });
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
