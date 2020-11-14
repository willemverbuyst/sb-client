import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ALL_PLAYERS_FETCHED,
  REMOVE_ALL_PLAYERS,
  AllPlayersFetched,
  Player,
  RemoveAllPlayers,
} from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { GetState } from '../types';

const allPlayersFetched = (players: Player[]): AllPlayersFetched => {
  return {
    type: ALL_PLAYERS_FETCHED,
    players,
  };
};

const removeAllPlayers = (): RemoveAllPlayers => {
  return {
    type: REMOVE_ALL_PLAYERS,
  };
};

export const removePlayers = () => removeAllPlayers();

export const fetchAllPlayers = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (!getState().adminState.players) {
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
  }
};
