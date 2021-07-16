import { IPrediction } from '../../../models/predictions.model';
import {
  ICurrentRound,
  IFixtureWithScoreAndPredictions,
  TotoRound,
} from '../../../models/toto.models';
import {
  ActionType,
  PostPrediction,
  ResetAllFixtures,
  StoreAllFixtures,
  StoreCurrentRound,
  UpdatePrediction,
} from '../action-types';
import reducer, { IPredictionsState } from '../reducer';

describe('#IPredictionsStateReducer', () => {
  describe('if given STORE_CURRENT_ROUND action type and intialState', () => {
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
    const initialState: IPredictionsState = {
      currentRound: null,
      allFixtures: null,
    };
    const action: StoreCurrentRound = {
      type: ActionType.STORE_CURRENT_ROUND,
      payload: currentRound,
    };
    const newState: IPredictionsState = reducer(initialState, action);

    test('returns the initial state with current round', () => {
      expect(newState.allFixtures).toBeNull;
      expect(newState.currentRound).not.toBeNull;
      expect(newState).not.toEqual(initialState);
    });
  });

  describe('if given STORE_ALL_FIXTURES action type and intialState', () => {
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
    const initialState: IPredictionsState = {
      currentRound: null,
      allFixtures: null,
    };
    const action: StoreAllFixtures = {
      type: ActionType.STORE_ALL_FIXTURES,
      payload: totoRound,
    };
    const newState: IPredictionsState = reducer(initialState, action);

    test('returns the initial state with all fixtures', () => {
      expect(newState.allFixtures).not.toBeNull;
      expect(newState.allFixtures?.length).not.toBe(3);
      expect(newState.currentRound).toBeNull;
      expect(newState).not.toEqual(initialState);
    });
  });

  describe('if given POST_PREDICTION action type and a state', () => {
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
    const totoRound: TotoRound[] = [[[fixture]]];
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    };
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const state: IPredictionsState = {
      currentRound,
      allFixtures: totoRound,
    };
    const action: PostPrediction = {
      type: ActionType.POST_PREDICTION,
      payload: prediction,
    };
    const newState: IPredictionsState = reducer(state, action);

    test('returns the state with prediction added', () => {
      expect(newState.allFixtures).not.toBeNull;
      /*eslint-disable */
      expect(newState.allFixtures?.length).toBe(totoRound.length);
      expect(newState.allFixtures![0][0][0].predictions.pGoalsAwayTeam).toBe(1);
      expect(newState.allFixtures![0][0][0].predictions.pGoalsHomeTeam).toBe(4);
      expect(
        newState.currentRound!.fixtures![0].predictions.pGoalsAwayTeam,
      ).toBe(1);
      expect(
        newState.currentRound!.fixtures![0].predictions.pGoalsHomeTeam,
      ).toBe(4);
      /*eslint-enable */
    });
  });

  describe('if given RESET_ALL_FIXTURES action type and a state', () => {
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
    const fixtures: IFixtureWithScoreAndPredictions[] = [fixture];
    const currentRound: ICurrentRound = {
      fixtures,
      roundNumber: 1,
      totoRoundNumber: 1,
    };
    const totoRound: TotoRound[] = [[[fixture]]];
    const initialState: IPredictionsState = {
      currentRound: null,
      allFixtures: null,
    };
    const state: IPredictionsState = {
      currentRound,
      allFixtures: totoRound,
    };
    const action: ResetAllFixtures = {
      type: ActionType.RESET_ALL_FIXTURES,
    };
    const newState: IPredictionsState = reducer(state, action);

    test('returns the initial state', () => {
      expect(newState.allFixtures).toBeNull;
      expect(newState.currentRound).toBeNull;
      expect(newState).toEqual(initialState);
    });
  });

  describe('if given UPDATE_PREDICTION action type and a state', () => {
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
    const totoRound: TotoRound[] = [[[fixture]]];
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    };
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const state: IPredictionsState = {
      currentRound,
      allFixtures: totoRound,
    };
    const action: UpdatePrediction = {
      type: ActionType.UPDATE_PREDICTION,
      payload: prediction,
    };
    const newState: IPredictionsState = reducer(state, action);

    test('returns the state with updated prediction', () => {
      expect(newState.allFixtures).not.toBeNull;
      expect(newState.allFixtures?.length).toBe(totoRound.length);
      expect(newState.currentRound).toBeNull;
      /*eslint-disable */
      expect(newState.allFixtures![0][0][0].predictions.pGoalsAwayTeam).toBe(1);
      expect(newState.allFixtures![0][0][0].predictions.pGoalsHomeTeam).toBe(4);
      expect(
        newState.allFixtures![0][0][0].predictions.pGoalsAwayTeam,
      ).not.toBe(5);
      expect(
        newState.allFixtures![0][0][0].predictions.pGoalsHomeTeam,
      ).not.toBe(7);
      expect(
        newState.currentRound!.fixtures![0].predictions.pGoalsAwayTeam,
      ).toBe(1);
      expect(
        newState.currentRound!.fixtures![0].predictions.pGoalsHomeTeam,
      ).toBe(4);
      /*eslint-enable */
    });
  });
});
