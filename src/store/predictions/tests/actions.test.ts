import axios from 'axios';

import { IPrediction } from '../../../models/predictions.model';
import { ICurrentRound, IFixtureWithScoreAndPredictions, TotoRound } from '../../../models/toto.models';
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions';
import {
  allFixturesFetched,
  changePrediction,
  currentRoundFetched,
  fetchAllFixtures,
  fetchCurrentRound,
  postNewPrediction,
  postPrediction,
  removeAllFixtures,
  updatePrediction,
} from '../actions';
import {
  ALL_FIXTURES_FETCHED,
  AllFixturesFetched,
  CURRENT_ROUND_FETCHED,
  CurrentRoundFetched,
  POST_PREDICTION,
  PostPrediction,
  REMOVE_ALL_FIXTURES,
  RemoveAllFixtures,
  UPDATE_PREDICTION,
  UpdatePrediction,
} from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#predictionsState', () => {
  describe('#allFixturesFetched', () => {
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
    const expected: AllFixturesFetched = {
      type: ALL_FIXTURES_FETCHED,
      allFixtures: totoRound,
    };

    test('returns an action w/ type ALL_FIXTURES_FETCHED and fixtures as payload', () => {
      expect(allFixturesFetched(totoRound)).toEqual(expected);
      expect(allFixturesFetched(totoRound).allFixtures.length).toBeGreaterThan(0);
    });
  });

  describe('#currentRoundFetched', () => {
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
    const expected: CurrentRoundFetched = {
      type: CURRENT_ROUND_FETCHED,
      currentRound,
    };

    test('returns an action w/ type CURRENT_ROUND_FETCHED and current round as payload', () => {
      expect(currentRoundFetched(currentRound)).toEqual(expected);
      expect(currentRoundFetched(currentRound).currentRound).toEqual(currentRound);
      expect(currentRoundFetched(currentRound)).toHaveProperty('currentRound');
    });
  });

  describe('#postPrediction', () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const expected: PostPrediction = {
      type: POST_PREDICTION,
      prediction,
    };

    test('returns an action w/ type POST_PREDICTION, and prediction as payload', () => {
      expect(postPrediction(prediction)).toEqual(expected);
      expect(postPrediction(prediction).prediction).toEqual(prediction);
      expect(postPrediction(prediction)).toHaveProperty('prediction');
    });
  });

  describe('#removeAllFixtures', () => {
    const expected: RemoveAllFixtures = {
      type: REMOVE_ALL_FIXTURES,
    };

    test('returns an action w/ type REMOVE_ALL_FIXTURES, and no payload', () => {
      expect(removeAllFixtures()).toEqual(expected);
      expect(removeAllFixtures()).not.toHaveProperty('fixgtures');
    });
  });

  describe('#updatePrediction', () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const expected: UpdatePrediction = {
      type: UPDATE_PREDICTION,
      prediction,
    };

    test('returns an action w/ type UPDATE_PREDICTION, and prediction as payload', () => {
      expect(updatePrediction(prediction)).toEqual(expected);
      expect(updatePrediction(prediction).prediction).toEqual(prediction);
      expect(updatePrediction(prediction)).toHaveProperty('prediction');
    });
  });
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
    expect(dispatch).toHaveBeenCalledWith(allFixturesFetched(totoRound));
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
    expect(dispatch).toHaveBeenCalledWith(currentRoundFetched(currentRound));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#postNewPrediction', () => {
  it('calls axios and add a prediction', async () => {
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
