import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  GetUserState,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  User,
} from './types';
import { LogInCredentials } from '../../models/credentials.model';

const logInSuccessUser = (user: User): LogInSuccessUser => {
  return {
    type: LOG_IN_SUCCESS_USER,
    user,
  };
};

const logOutUser = (): LogOutUser => ({
  type: LOG_OUT_USER,
});

const tokenUserStillValid = (user: User): TokenUserStillValid => ({
  type: TOKEN_STILL_VALID_USER,
  user,
});

export const userLogIn = (credentials: LogInCredentials) => {
  const { email, password } = credentials;
  return async (dispatch: any, _getState: GetUserState) => {
    // dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(logInSuccessUser(response.data.userData));
      // dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        // dispatch(setMessage('error', true, error.response.data.message));
      } else {
        console.log(error.message);
        // dispatch(setMessage('error', true, error.message));
      }
      // dispatch(appDoneLoading());
    }
  };
};

export const userLogOut = () => {
  return (dispatch: Dispatch, _getState: GetUserState) => {
    dispatch(logOutUser());
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch: Dispatch, _getState: GetUserState) => {
    // dispatch(appLoading());
    try {
      // if token check if valid
      const token = localStorage.getItem('user_token');
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenUserStillValid(response.data.userData));
      // dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOutUser());
      // dispatch(appDoneLoading());
    }
  };
};
