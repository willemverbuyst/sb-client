import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  UPDATE_USER_PROFILE,
  USER_SCORES_FETCHED,
  LogInSuccessUser,
  LogOutUser,
  ScoresUser,
  TokenUserStillValid,
  UpdateUserProfile,
  UserScoresFetched,
} from './types';
import { GetState } from '../types';
import {
  ILogInCredentials,
  IProfileDetails,
} from '../../models/credentials.model';
import { IUser } from '../../models/player.model';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { removeAllPlayers } from '../players/actions';
import { removeAllFixtures } from '../predictions/actions';
import { removeAllTeams } from '../teams/actions';
import { removeAllScores } from '../scores/actions';

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

export const updateUserProfile = (user: IUser): UpdateUserProfile => ({
  type: UPDATE_USER_PROFILE,
  user,
});

export const userScoresFetched = (scores: ScoresUser): UserScoresFetched => ({
  type: USER_SCORES_FETCHED,
  scores,
});

export const changePassword = (newPassword: string) => {
  return async (dispatch: Dispatch, _getState: GetState) => {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.patch(
        `${apiUrl}/me/password`,
        {
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

export const editUserProfile = (profileDetails: IProfileDetails) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    admin,
    totaalToto,
    teamId,
  } = profileDetails;
  return async (dispatch: Dispatch, _getState: GetState) => {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.patch(
        `${apiUrl}/me/profile`,
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(updateUserProfile(response.data.userData));
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

export const fetchUserScores = () => async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/scores/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const scores = response.data.scores;

    dispatch(userScoresFetched(scores));
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

export const userLogIn = (credentials: ILogInCredentials) => {
  const { email, password } = credentials;
  return async (dispatch: Dispatch, _getState: GetState) => {
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

export const userLogOut = () => (dispatch: Dispatch) => {
  dispatch(logOutUser());
  dispatch(setMessage('success', 'Tot ziens!'));
  dispatch(removeAllScores());
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
    userLogOut();
    dispatch(appDoneLoading());
  }
};
