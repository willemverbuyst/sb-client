import axios from 'axios';

import { IPrediction } from '../../../models/predictions.model';
import { ICurrentRound, IFixtureWithScoreAndPredictions, TotoRound } from '../../../models/toto.models';
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions';
import { changePrediction, fetchAllFixtures, fetchCurrentRound, postNewPrediction } from '../action-creators';
import { postPrediction, storeAllFixtures, storeCurrentRound, updatePrediction } from '../actions';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#changePrediction', () => {
  it('calls axios and changes an existing prediction', async () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: { prediction, message: 'test_message' } };

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response));

    await changePrediction(prediction)(dispatch, getState, extraArg);

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(updatePrediction(prediction));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#fetchAllFixtures', () => {
  it('calls axios and returns fixtures', async () => {
    const totoRound: TotoRound[] = [
      [
        [
          {
            awayTeamId: 1,
            awayTeamLogo: 'test',
            awayTeamName: 'test',
            createdAt: 'test',
            eventTimeStamp: 1,
            goalsAwayTeam: null,
            goalsHomeTeam: null,
            homeTeamId: 1,
            homeTeamLogo: 'test',
            homeTeamName: 'test',
            id: 1,
            round: 'test',
            status: 'test',
            updatedAt: 'test',
            score: 'scores',
            predictions: {
              pGoalsAwayTeam: null,
              pGoalsHomeTeam: null,
            },
          },
        ],
      ],
    ];
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: totoRound };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchAllFixtures()(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeAllFixtures(totoRound));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchCurrentRound', () => {
  it('calls axios and returns current round', async () => {
    const fixtures: IFixtureWithScoreAndPredictions[] = [
      {
        awayTeamId: 1,
        awayTeamLogo: 'test',
        awayTeamName: 'test',
        createdAt: 'test',
        eventTimeStamp: 1,
        goalsAwayTeam: null,
        goalsHomeTeam: null,
        homeTeamId: 1,
        homeTeamLogo: 'test',
        homeTeamName: 'test',
        id: 1,
        round: 'test',
        status: 'test',
        updatedAt: 'test',
        score: 'scores',
        predictions: {
          pGoalsAwayTeam: null,
          pGoalsHomeTeam: null,
        },
      },
    ];
    const currentRound: ICurrentRound = {
      fixtures,
      roundNumber: 1,
      totoRoundNumber: 1,
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: currentRound };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchCurrentRound()(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeCurrentRound(currentRound));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#postNewPrediction', () => {
  it('calls axios and adds a prediction', async () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: { prediction, message: 'test_message' } };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await postNewPrediction(prediction)(dispatch, getState, extraArg);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(postPrediction(prediction));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
