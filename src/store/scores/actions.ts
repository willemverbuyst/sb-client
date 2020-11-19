import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import { SCORES_MATCH_FETCHED, Match, ScoresMatchFetched } from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { GetState } from '../types';

const scoresMatchFetched = (match: Match): ScoresMatchFetched => {
  return {
    type: SCORES_MATCH_FETCHED,
    match,
  };
};

export const fetchScoresMatch = (id: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (!getState().teamsState.teams) {
    dispatch(appLoading());
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.get(`${apiUrl}/scores/fixtures/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const match = response.data;

      dispatch(scoresMatchFetched(match));
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
