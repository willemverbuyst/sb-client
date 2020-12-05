import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
} from './types';
import { GetState } from '../types';
import { ILogInCredentials } from '../../models/credentials.model';
import { IUser } from '../../models/player.model';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { removeAllPlayers } from '../players/actions';
import { removeAllFixtures } from '../voorspellingen/actions';
import { removeAllTeams } from '../teams/actions';

export const logInSuccessUser = (user: IUser): LogInSuccessUser => {
  return {
    type: LOG_IN_SUCCESS_USER,
    user,
  };
};

export const logOutUser = (): LogOutUser => ({
  type: LOG_OUT_USER,
});

export const tokenUserStillValid = (user: IUser): TokenUserStillValid => ({
  type: TOKEN_STILL_VALID_USER,
  user,
});

export const userLogIn = (credentials: ILogInCredentials) => {
  const { email, password } = credentials;
  return async (dispatch: any, _getState: GetState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(logInSuccessUser(response.data.userData));
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

export const userLogOut = (dispatch: Dispatch, _getState: GetState) => {
  dispatch(logOutUser());
  dispatch(removeAllPlayers());
  dispatch(removeAllFixtures());
  dispatch(removeAllTeams());
};

export const getUserWithStoredToken = async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    // if token check if valid
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(tokenUserStillValid(response.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(logOutUser());
    dispatch(appDoneLoading());
  }
};
