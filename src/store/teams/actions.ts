import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ALL_TEAMS_FETCHED,
  REMOVE_ALL_TEAMS,
  AllTeamsFetched,
  Team,
  RemoveAllTeams,
} from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { GetState } from '../types';

const allTeamsFetched = (teams: Team[]): AllTeamsFetched => {
  return {
    type: ALL_TEAMS_FETCHED,
    teams,
  };
};

const removeAllTeams = (): RemoveAllTeams => {
  return {
    type: REMOVE_ALL_TEAMS,
  };
};

export const removeTeams = () => removeAllTeams();

export const fetchAllTeams = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (!getState().teamsState.teams) {
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
  }
};