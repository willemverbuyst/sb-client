import { IPrediction } from '../../../models/predictions.model';
import {
  ICurrentRound,
  IFixtureWithScoreAndPredictions,
  TotoRound,
} from '../../../models/toto.models';
import reducer from '../reducer';
import {
  ALL_FIXTURES_FETCHED,
  CURRENT_ROUND_FETCHED,
  POST_PREDICTION,
  REMOVE_ALL_FIXTURES,
  UPDATE_PREDICTION,
  AllFixturesFetched,
  CurrentRoundFetched,
  PostPrediction,
  RemoveAllFixtures,
  UpdatePrediction,
  PredictionsState,
} from '../types';

describe('#predictionsStateReducer', () => {
  describe('if given CURRENT_ROUND_FETCHED action type and intialState', () => {
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
    const initialState: PredictionsState = {
      currentRound: null,
      allFixtures: null,
    };
    const action: CurrentRoundFetched = {
      type: CURRENT_ROUND_FETCHED,
      currentRound,
    };
    const newState: PredictionsState = reducer(initialState, action);

    test('returns the initial state with current round', () => {
      expect(newState.allFixtures).toBeNull;
      expect(newState.currentRound).not.toBeNull;
      expect(newState).not.toEqual(initialState);
    });
  });
  describe('if given ALL_FIXTURES_FETCHED action type and intialState', () => {
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

    const initialState: PredictionsState = {
      currentRound: null,
      allFixtures: null,
    };
    const action: AllFixturesFetched = {
      type: ALL_FIXTURES_FETCHED,
      allFixtures: totoRound,
    };
    const newState: PredictionsState = reducer(initialState, action);

    test('returns the initial state with current round', () => {
      expect(newState.allFixtures).not.toBeNull;
      expect(newState.allFixtures?.length).not.toBe(3);
      expect(newState.currentRound).toBeNull;
      expect(newState).not.toEqual(initialState);
    });
  });
  describe('if given POST_PREDICTION action type and a state', () => {
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
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const state: PredictionsState = {
      currentRound: null,
      allFixtures: totoRound,
    };
    const action: PostPrediction = {
      type: POST_PREDICTION,
      prediction,
    };
    const newState: PredictionsState = reducer(state, action);

    test('returns the initial state with current round', () => {
      expect(newState.allFixtures).not.toBeNull;
      expect(newState.allFixtures?.length).toBe(totoRound.length);
      expect(newState.currentRound).toBeNull;
      expect(newState.allFixtures![0][0][0].predictions.pGoalsAwayTeam).toBe(1);
      expect(newState.allFixtures![0][0][0].predictions.pGoalsHomeTeam).toBe(4);
    });
  });
  describe('if given REMOVE_ALL_FIXTURES action type and a state', () => {
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
    const initialState: PredictionsState = {
      currentRound: null,
      allFixtures: null,
    };
    const state: PredictionsState = {
      currentRound,
      allFixtures: totoRound,
    };
    const action: RemoveAllFixtures = {
      type: REMOVE_ALL_FIXTURES,
    };
    const newState: PredictionsState = reducer(state, action);

    test('returns the initial state', () => {
      expect(newState.allFixtures).toBeNull;
      expect(newState.currentRound).toBeNull;
      expect(newState).toEqual(initialState);
    });
  });
});
