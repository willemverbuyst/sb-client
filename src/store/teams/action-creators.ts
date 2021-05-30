import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API_URL } from '../../config/constants';
import { appDoneLoading, appLoading, setMessage } from '../appState/actions-creators';
import { StoreState } from '../types';
import { allTeamsFetched } from './actions';

export const fetchAllTeams = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`${API_URL}/teams`, {
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
