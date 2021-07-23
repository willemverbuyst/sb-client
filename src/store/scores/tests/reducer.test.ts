import {
  IFixtureWithUsersWithScoreAndPrediction,
  IUsersWithScoreAndRoundId,
  IUsersWithScoreAndTotoRoundId,
  IUserWithScore,
  IUserWithScoreAndPrediction,
} from '../../../models/scores.models';
import { IFixture } from '../../../models/toto.models';
import {
  ActionType,
  ResetAllScores,
  StoreScoresFixture,
  StoreScoresRound,
  StoreScoresTotalToto,
  StoreScoresTotoRound,
} from '../action-types';
import reducer, { IScoresState } from '../reducer';

describe('#scoresStateReducer', () => {
  describe('if given RESET_ALL_SCORES action type and a state', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
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
    const totalTotoScores: IUserWithScore[] = [
      {
        userId: 1,
        score: 1,
        user: 'test_user',
      },
    ];
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
    const state: IScoresState = {
      fixtureScores,
      roundScores,
      totalTotoScores,
      totoRoundScores,
    };
    const action: ResetAllScores = {
      type: ActionType.RESET_ALL_SCORES,
    };
    const newState: IScoresState = reducer(state, action);

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState);
      expect(newState).toHaveProperty('fixtureScores');
      expect(newState.fixtureScores).toBeNull();
      expect(newState.totalTotoScores).toBeNull();
      expect(newState.totoRoundScores).toBeNull();
    });
  });

  describe('if given STORE_SCORES_FIXTURE action type and a payload with fixtures', () => {
    const initialState: IScoresState = {
      fixtureScores: null,
      roundScores: null,
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
    const predictionWithScorePerUser: IUserWithScoreAndPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 1,
      score: 10,
      user: 'test_user',
      userId: 1,
    };
    const fixture: IFixtureWithUsersWithScoreAndPrediction = {
      fixture: fetchedFixture,
      scores: [predictionWithScorePerUser],
    };

    const action: StoreScoresFixture = {
      type: ActionType.STORE_SCORES_FIXTURE,
      payload: fixture,
    };

    const newState: IScoresState = reducer(initialState, action);

    test('returns a state w/ a fixture with scores', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.roundScores).toBeNull();
      expect(newState.totalTotoScores).toBeNull();
      expect(newState.totoRoundScores).toBeNull();
      expect(newState).toHaveProperty('fixtureScores');
      expect(newState.fixtureScores).not.toBeNull();
      expect(newState.fixtureScores?.scores?.length).toBeGreaterThan(0);
      expect(newState.fixtureScores?.scores?.length).toBeLessThan(2);
      expect(newState.fixtureScores?.fixture).not.toBeNull();
    });
  });

  describe('if given STORE_SCORES_ROUND action type and a payload with a round', () => {
    const initialState: IScoresState = {
      fixtureScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
    };
    const round: IUsersWithScoreAndRoundId = {
      usersWithScores: [
        {
          score: 10,
          user: 'test_user',
          userId: 1,
        },
      ],
      roundId: 1,
    };

    const action: StoreScoresRound = {
      type: ActionType.STORE_SCORES_ROUND,
      payload: round,
    };
    const newState: IScoresState = reducer(initialState, action);

    test('returns a state w/ a totoRoundScores', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.fixtureScores).toBeNull();
      expect(newState.totoRoundScores).toBeNull();
      expect(newState.totalTotoScores).toBeNull();
      expect(newState.roundScores).not.toBeNull();
      expect(newState).toHaveProperty('totoRoundScores');
      expect(newState.roundScores?.usersWithScores.length).toBeGreaterThan(0);
      expect(newState.roundScores?.usersWithScores.length).toBeLessThan(2);
    });
  });

  describe('if given STORE_SCORES_TOTAL_TOTO action type and a payload with totalToto', () => {
    const initialState: IScoresState = {
      fixtureScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
    };
    const totalToto: IUserWithScore[] = [
      {
        score: 10,
        user: 'test_user',
        userId: 1,
      },
    ];
    const action: StoreScoresTotalToto = {
      type: ActionType.STORE_SCORES_TOTAL_TOTO,
      payload: totalToto,
    };
    const newState: IScoresState = reducer(initialState, action);

    test('returns a state w/ a totalTotoScores', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.fixtureScores).toBeNull();
      expect(newState.roundScores).toBeNull();
      expect(newState.totalTotoScores).not.toBeNull();
      expect(newState.totoRoundScores).toBeNull();
      expect(newState).toHaveProperty('totalTotoScores');
      expect(newState.totalTotoScores?.length).toBeGreaterThan(0);
      expect(newState.totalTotoScores?.length).toBeLessThan(2);
    });
  });

  describe('if given STORE_SCORES_TOTO_ROUND action type and a payload with totoRound', () => {
    const initialState: IScoresState = {
      fixtureScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
    };
    const totoRound: IUsersWithScoreAndTotoRoundId = {
      usersWithScores: [
        {
          score: 10,
          user: 'test_user',
          userId: 1,
        },
      ],
      totoRoundId: 1,
    };

    const action: StoreScoresTotoRound = {
      type: ActionType.STORE_SCORES_TOTO_ROUND,
      payload: totoRound,
    };
    const newState: IScoresState = reducer(initialState, action);

    test('returns a state w/ a totoRoundScores', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.fixtureScores).toBeNull();
      expect(newState.roundScores).toBeNull();
      expect(newState.totalTotoScores).toBeNull();
      expect(newState.totoRoundScores).not.toBeNull();
      expect(newState).toHaveProperty('totoRoundScores');
      expect(newState.totoRoundScores?.usersWithScores.length).toBeGreaterThan(
        0,
      );
      expect(newState.totoRoundScores?.usersWithScores.length).toBeLessThan(2);
    });
  });
});
