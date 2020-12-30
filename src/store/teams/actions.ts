import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { apiUrl } from '../../config/constants';
import { ITeam } from '../../models/toto.models';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions';
import { StoreState } from '../types';
import { ALL_TEAMS_FETCHED, AllTeamsFetched, REMOVE_ALL_TEAMS, RemoveAllTeams } from './types';

export const allTeamsFetched = (teams: ITeam[]): AllTeamsFetched => {
  return {
    type: ALL_TEAMS_FETCHED,
    teams,
  };
};

export const removeAllTeams = (): RemoveAllTeams => {
  return {
    type: REMOVE_ALL_TEAMS,
  };
};

export const fetchAllTeams = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${apiUrl}/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const teams = response.data;

    dispatch(allTeamsFetched(teams));
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
