import { IFixture } from '../../../models/toto.models';
import reducer from '../reducer';
import {
  REMOVE_ALL_SCORES,
  SCORES_FIXTURE_FETCHED,
  SCORES_TOTAL_TOTO_FETCHED,
  SCORES_TOTO_ROUND_FETCHED,
  FixtureWithScores,
  UserWithScore,
  RemoveAllScores,
  ScoresFixtureFetched,
  ScoresTotalTotoFetched,
  ScoresTotoRoundFetched,
  ScoresState,
  PredictionWithScorePerUser,
} from '../types';

describe('#scoresStateReducer', () => {
  describe('if given REMOVE_ALL_SCORES action type and a state', () => {
    const initialState: ScoresState = {
      fixtureScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
    };
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
    const totalTotoScores: UserWithScore[] = [
      {
        id: 1,
        score: 1,
        user: 'test_user',
      },
    ];
    const totoRoundScores: UserWithScore[] = [
      {
        id: 1,
        score: 1,
        user: 'test_user',
      },
    ];
    const state: ScoresState = {
      fixtureScores,
      totalTotoScores,
      totoRoundScores,
    };
    const action: RemoveAllScores = {
      type: REMOVE_ALL_SCORES,
    };
    const newState: ScoresState = reducer(state, action);

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState);
      expect(newState).toHaveProperty('fixtureScores');
      expect(newState.fixtureScores).toEqual(null);
      expect(newState.totalTotoScores).toEqual(null);
      expect(newState.totoRoundScores).toEqual(null);
    });
  });
  describe('if given SCORES_FIXTURE_FETCHED action type and a payload with fixtures', () => {
    const initialState: ScoresState = {
      fixtureScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
    };
    const fetchedFixture: IFixture = {
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
    const fixture: FixtureWithScores = {
      fixture: fetchedFixture,
      scores: [predictionWithScorePerUser],
    };

    const action: ScoresFixtureFetched = {
      type: SCORES_FIXTURE_FETCHED,
      fixture,
    };

    const newState: ScoresState = reducer(initialState, action);

    test('returns a state w/ a fixture with scores', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.totalTotoScores).toEqual(null);
      expect(newState.totoRoundScores).toEqual(null);
      expect(newState).toHaveProperty('fixtureScores');
      expect(newState.fixtureScores).not.toEqual(null);
      expect(newState.fixtureScores?.scores?.length).toBeGreaterThan(0);
      expect(newState.fixtureScores?.scores?.length).toBeLessThan(2);
      expect(newState.fixtureScores?.fixture).not.toEqual(null);
    });
  });
});
