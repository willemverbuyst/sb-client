import axios from 'axios';

import {
  IFixtureWithUsersWithScoreAndPrediction,
  IPlayerWithScore,
  IUsersWithScoreAndRoundId,
  IUsersWithScoreAndTotoRoundId,
  IUserWithScoreAndPrediction,
} from '../../../models/scores.models';
import { IFixture } from '../../../models/toto.models';
import { appDoneLoading, appLoading } from '../../appState/actions';
import {
  fetchScoresFixture,
  fetchScoresRound,
  fetchScoresTotalToto,
  fetchScoresTotoRound,
} from '../action-creators';
import {
  storeScoresFixture,
  storeScoresRound,
  storeScoresTotalToto,
  storeScoresTotoRound,
} from '../actions';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#fetchScoresFixture', () => {
  it('calls axios and returns a fixture with scores', async () => {
    const id = 1;
    const fixture: IFixture = {
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
    };
    const predictionWithScorePerUser: IUserWithScoreAndPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 1,
      score: 10,
      user: 'test_user',
      userId: 1,
    };
    const fixtureScores: IFixtureWithUsersWithScoreAndPrediction = {
      fixture,
      scores: [predictionWithScorePerUser],
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: fixtureScores };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchScoresFixture(id)(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeScoresFixture(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchScoresRound', () => {
  it('calls axios and returns a round with scores', async () => {
    const id = 1;
    const roundScores: IUsersWithScoreAndRoundId = {
      usersWithScores: [
        {
          userId: 1,
          score: 1,
          user: 'test_user',
        },
      ],
      roundId: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: roundScores };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchScoresRound(id)(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeScoresRound(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchScoresTotalToto', () => {
  it('calls axios and returns the totalToto', async () => {
    const totalTotoScores: IUserWithScore[] = [
      {
        userId: 1,
        score: 1,
        user: 'test_user',
      },
    ];

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: totalTotoScores };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchScoresTotalToto()(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeScoresTotalToto(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchScoresTotoRound', () => {
  it('calls axios and returns a totoRound with scores', async () => {
    const id = 1;
    const totoRoundScores: IUsersWithScoreAndTotoRoundId = {
      usersWithScores: [
        {
          userId: 1,
          score: 1,
          user: 'test_user',
        },
      ],
      totoRoundId: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: totoRoundScores };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchScoresTotoRound(id)(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeScoresTotoRound(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
