import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API_URL } from '../../config/constants';
import { ILogInCredentials, IProfileDetails } from '../../models/credentials.model';
import { AppStateActions } from '../appState/action-types';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions';
import { handleError } from '../error-handler';
import { resetPlayers } from '../players/actions';
import { resetAllFixtures } from '../predictions/actions';
import { resetAllScores } from '../scores/actions';
import { resetAllTeams } from '../teams/actions';
import { StoreState } from '../types';
import { UserActions } from './action-types';
import { logInSuccessUser, logOutUser, tokenUserStillValid, updateUserProfile } from './actions';

export const changePassword = (newPassword: string): ThunkAction<void, StoreState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.patch(
        `${API_URL}/me/password`,
        {
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(setMessage('success', response.data.message));
      dispatch(appDoneLoading());
    } catch (error) {
      handleError(error);
    }
  };
};

export const editUserProfile = (
  profileDetails: IProfileDetails,
): ThunkAction<void, StoreState, unknown, Action<string>> => {
  const { userName, firstName, lastName, email, phoneNumber, admin, totaalToto, teamId } = profileDetails;
  return async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.patch(
        `${API_URL}/me/profile`,
        {
          userName,
          firstName,
          lastName,
          email,
          phoneNumber,
          admin,
          totaalToto,
          teamId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      dispatch(updateUserProfile(response.data.userData));
      dispatch(setMessage('success', response.data.message));
      dispatch(appDoneLoading());
    } catch (error) {
      handleError(error);
    }
  };
};

export const userLogIn = (credentials: ILogInCredentials): ThunkAction<void, StoreState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading());
    try {
      const { email, password } = credentials;
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      dispatch(logInSuccessUser(response.data.userData));
      dispatch(setMessage('success', response.data.message));
      dispatch(appDoneLoading());
    } catch (error) {
      handleError(error);
    }
  };
};

export const userLogOut = (): ((dispatch: Dispatch) => void) => (dispatch: Dispatch) => {
  console.log('llogin out');
  dispatch(logOutUser());
  dispatch(setMessage('success', 'Tot ziens!'));
  dispatch(resetAllScores());
  dispatch(resetPlayers());
  dispatch(resetAllFixtures());
  dispatch(resetAllTeams());
};

export const getUserWithStoredToken = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<AppStateActions | UserActions>,
) => {
  dispatch(appLoading());
  try {
    // if token check if valid
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(tokenUserStillValid(response.data));
    dispatch(appDoneLoading());
  } catch (error) {
    userLogOut()(dispatch);
    handleError(error);
  }
};
