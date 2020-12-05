import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  PLAYER_PROFILE_FETCHED,
  REMOVE_ALL_PLAYERS,
  AddNewPlayer,
  AllPlayersFetched,
  PlayerProfileFetched,
  RemoveAllPlayers,
} from './types';
import { GetState } from '../types';
import { ISignUpCredentials } from '../../models/credentials.model';
import { IPlayer, IPlayerProfile } from '../../models/player.model';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

export const addNewPlayer = (player: IPlayer): AddNewPlayer => {
  return {
    type: ADD_NEW_PLAYER,
    player,
  };
};

export const allPlayersFetched = (players: IPlayer[]): AllPlayersFetched => {
  return {
    type: ALL_PLAYERS_FETCHED,
    players,
  };
};

export const playerProfileFetched = (
  playerProfile: IPlayerProfile
): PlayerProfileFetched => {
  return {
    type: PLAYER_PROFILE_FETCHED,
    playerProfile,
  };
};

export const removeAllPlayers = (): RemoveAllPlayers => {
  return {
    type: REMOVE_ALL_PLAYERS,
  };
};

export const addPlayer = (signUpCredentials: ISignUpCredentials) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    admin,
    totaalToto,
    teamId,
  } = signUpCredentials;
  return async (dispatch: Dispatch, _getState: GetState) => {
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(addNewPlayer(response.data.userData));
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

export const fetchAllPlayers = async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const players = response.data;

    dispatch(allPlayersFetched(players));
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

export const fetchPlayerProfile = (id: number) => async (
  dispatch: Dispatch,
  _getState: GetState
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const playerProfile = response.data;

    // console.log(playerProfile);
    dispatch(playerProfileFetched(playerProfile));
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

export const removePlayers = () => removeAllPlayers();
