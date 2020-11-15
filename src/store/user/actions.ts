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
  UserData,
} from './types';
import { LogInCredentials } from '../../models/credentials.model';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { removePlayers } from '../admin/actions';
import { GetState } from '../appState/types';

const logInSuccessUser = (userData: UserData): LogInSuccessUser => {
  return {
    type: LOG_IN_SUCCESS_USER,
    userData,
  };
};

const logOutUser = (): LogOutUser => ({
  type: LOG_OUT_USER,
});

const tokenUserStillValid = (userData: UserData): TokenUserStillValid => ({
  type: TOKEN_STILL_VALID_USER,
  userData,
});

export const userLogIn = (credentials: LogInCredentials) => {
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

export const userLogOut = () => {
  return (dispatch: Dispatch, _getState: GetState) => {
    dispatch(logOutUser());
    dispatch(removePlayers());
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch: Dispatch, _getState: GetState) => {
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
};
