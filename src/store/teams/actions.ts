import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ALL_TEAMS_FETCHED, REMOVE_ALL_TEAMS, AllTeamsFetched, RemoveAllTeams } from './types';
import { GetState, StoreState } from '../types';
import { ITeam } from '../../models/toto.models';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

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
  _getState: GetState,
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
