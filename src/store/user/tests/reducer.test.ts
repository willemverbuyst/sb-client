import { ICurrentRound, IFixtureWithScoreAndPredictions, ITeam } from '../../../models/toto.models';
import { ActionType, LogInSuccessUser, LogOutUser, TokenUserStillValid, UpdateUserProfile } from '../action-types';
import reducer, { IUserState, IUserWithCurrentRound } from '../reducer';

describe('#userReducer', () => {
  describe('with initial state and LOG_IN_SUCCESS_USER action', () => {
    const initialState: IUserState = {
      token: null,
      user: null,
    };
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
    const fixture: IFixtureWithScoreAndPredictions = {
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
    };
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    };
    const user: IUserWithCurrentRound = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
      token: 'test_token',
      currentRound,
    };
    const action: LogInSuccessUser = {
      type: ActionType.LOG_IN_SUCCESS_USER,
      payload: user,
    };
    const newState: IUserState = reducer(initialState, action);

    test('returns the new state with user', () => {
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(user.token);
      expect(newState).toEqual({ token: user.token, user });
      expect(newState).not.toEqual(initialState);
    });
  });

  describe('with given state and LOG_OUT_USER action', () => {
    const initialState: IUserState = {
      token: null,
      user: null,
    };
    const action: LogOutUser = {
      type: ActionType.LOG_OUT_USER,
    };
    const newState: IUserState = reducer(initialState, action);
    const newerState: IUserState = reducer({ token: 'x', user: null }, action);

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState);
      expect(newState.token).toBeNull();
      expect(initialState.token).toBeNull();
      expect(newState.token).not.toBe('x');
      expect(newerState.token).toBeNull();
      expect(newerState.user).toBeNull();
      expect(initialState.token).toBeNull();
    });
  });

  describe('on TOKEN_STILL_VALID_STUDENT action', () => {
    const initialState: IUserState = {
      token: null,
      user: null,
    };
    const state: IUserState = {
      token: 'test_token',
      user: null,
    };
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
    const fixture: IFixtureWithScoreAndPredictions = {
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
    };
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    };
    const user: IUserWithCurrentRound = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
      token: 'test_token',
      currentRound,
    };
    const action: TokenUserStillValid = {
      type: ActionType.TOKEN_STILL_VALID_USER,
      payload: user,
    };
    const newState: IUserState = reducer(state, action);

    test('returns the new state with student', () => {
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(user.token);
      expect(newState).toEqual({ token: user.token, user });
      expect(newState).not.toEqual(initialState);
    });

    describe('on UPDATE_USER_PROFILE action', () => {
      const team: ITeam = {
        id: 1,
        name: 'test_name',
        logo: 'test_logo',
      };
      const fixture: IFixtureWithScoreAndPredictions = {
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
      };
      const currentRound: ICurrentRound = {
        roundNumber: 1,
        totoRoundNumber: 1,
        fixtures: [fixture],
      };
      const user: IUserWithCurrentRound = {
        admin: true,
        email: 'test@test.com',
        firstName: 'test',
        id: 1,
        lastName: 'test',
        phoneNumber: 'test',
        team,
        totaalToto: true,
        userName: 'test',
        token: 'test_token',
        currentRound,
      };
      const state: IUserState = {
        token: 'test_token',
        user,
      };
      const userUpdated: IUserWithCurrentRound = {
        admin: true,
        email: 'test@test.com',
        firstName: 'test_updated',
        id: 1,
        lastName: 'test_updated',
        phoneNumber: 'test',
        team,
        totaalToto: true,
        userName: 'test',
        token: 'test_token',
        currentRound,
      };
      const action: UpdateUserProfile = {
        type: ActionType.UPDATE_USER_PROFILE,
        payload: userUpdated,
      };
      const newState: IUserState = reducer(state, action);

      test('returns the new state with student', () => {
        expect(newState.token).not.toBeNull();
        expect(newState.token).toBe(state.token);
        expect(newState).toEqual({ token: user.token, user: userUpdated });
        expect(newState).not.toEqual(state);
        expect(newState.user?.firstName).toBe('test_updated');
      });
    });
  });
});
