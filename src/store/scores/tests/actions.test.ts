import axios from 'axios';

import {
  REMOVE_ALL_SCORES,
  SCORES_FIXTURE_FETCHED,
  SCORES_ROUND_FETCHED,
  SCORES_TOTAL_TOTO_FETCHED,
  SCORES_TOTO_ROUND_FETCHED,
  FixtureWithScores,
  UserWithScore,
  RemoveAllScores,
  ScoresFixtureFetched,
  ScoresRoundFetched,
  ScoresTotalTotoFetched,
  ScoresTotoRoundFetched,
  ScoresState,
  PredictionWithScorePerUser,
  Scores,
} from '../types';
import {
  removeAllScores,
  scoresFixtureFetched,
  scoresRoundFetched,
} from '../actions';

import { appLoading, appDoneLoading, setMessage } from '../../appState/actions';
import { IFixture } from '../../../models/toto.models';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#scoressState', () => {
  describe('#removeAllScores', () => {
    const expected: RemoveAllScores = {
      type: REMOVE_ALL_SCORES,
    };

    test('returns an action w/ type REMOVE_ALL_SCORES and no payload', () => {
      expect(removeAllScores()).toEqual(expected);
      expect(removeAllScores()).not.toHaveProperty('payload');
      expect(removeAllScores().type).toBe(REMOVE_ALL_SCORES);
    });
  });

  describe('#scoresFixtureFetched w/ fixture', () => {
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
    const predictionWithScorePerUser: PredictionWithScorePerUser = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 1,
      score: 10,
      user: 'test_user',
      userId: 1,
    };
    const fixtureScores: FixtureWithScores = {
      fixture,
      scores: [predictionWithScorePerUser],
    };
    const expected: ScoresFixtureFetched = {
      type: SCORES_FIXTURE_FETCHED,
      fixture: fixtureScores,
    };

    test('returns an action w/ type SCORES_FIXTURE_FETCHED and a fixture as payload', () => {
      expect(scoresFixtureFetched(fixtureScores)).toEqual(expected);
      expect(scoresFixtureFetched(fixtureScores).fixture).not.toBe(undefined);
    });
  });

  describe('#scoresRoundFetched w/ sores', () => {
    const roundScores: Scores = {
      usersWithScores: [
        {
          id: 1,
          score: 1,
          user: 'test_user',
        },
      ],
      id: 1,
    };
    const expected: ScoresRoundFetched = {
      type: SCORES_ROUND_FETCHED,
      round: roundScores,
    };

    test('returns an action w/ type SCORES_FIXTURE_FETCHED and a fixture as payload', () => {
      expect(scoresRoundFetched(roundScores)).toEqual(expected);
      expect(scoresRoundFetched(roundScores).round).not.toBe(undefined);
      expect(scoresRoundFetched(roundScores).type).toBe(SCORES_ROUND_FETCHED);
    });
  });
});
