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
import {
  postPrediction,
  resetAllFixtures,
  storeAllFixtures,
  storeCurrentRound,
  updatePrediction,
} from '../actions';

describe('#predictionsState', () => {
  describe('#storeAllFixtures', () => {
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
    const expected: StoreAllFixtures = {
      type: ActionType.STORE_ALL_FIXTURES,
      payload: totoRound,
    };

    test('returns an action w/ type STORE_ALL_FIXTURES and fixtures as payload', () => {
      expect(storeAllFixtures(totoRound)).toEqual(expected);
      expect(storeAllFixtures(totoRound).payload).toEqual(totoRound);
      expect(storeAllFixtures(totoRound).type).toEqual(
        ActionType.STORE_ALL_FIXTURES,
      );
    });
  });

  describe('#storeCurrentRound', () => {
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
    const expected: StoreCurrentRound = {
      type: ActionType.STORE_CURRENT_ROUND,
      payload: currentRound,
    };

    test('returns an action w/ type STORE_CURRENT_ROUND and current round as payload', () => {
      expect(storeCurrentRound(currentRound)).toEqual(expected);
      expect(storeCurrentRound(currentRound).payload).toEqual(currentRound);
      expect(storeCurrentRound(currentRound).type).toEqual(
        ActionType.STORE_CURRENT_ROUND,
      );
    });
  });

  describe('#postPrediction', () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const expected: PostPrediction = {
      type: ActionType.POST_PREDICTION,
      payload: prediction,
    };

    test('returns an action w/ type POST_PREDICTION, and prediction as payload', () => {
      expect(postPrediction(prediction)).toEqual(expected);
      expect(postPrediction(prediction).payload).toEqual(prediction);
      expect(postPrediction(prediction).type).toEqual(
        ActionType.POST_PREDICTION,
      );
    });
  });

  describe('#resetAllFixtures', () => {
    const expected: ResetAllFixtures = {
      type: ActionType.RESET_ALL_FIXTURES,
    };

    test('returns an action w/ type RESET_ALL_FIXTURES, and no payload', () => {
      expect(resetAllFixtures()).toEqual(expected);
      expect(resetAllFixtures().type).toEqual(ActionType.RESET_ALL_FIXTURES);
      expect(resetAllFixtures()).not.toHaveProperty('payload');
    });
  });

  describe('#updatePrediction', () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    };
    const expected: UpdatePrediction = {
      type: ActionType.UPDATE_PREDICTION,
      payload: prediction,
    };

    test('returns an action w/ type UPDATE_PREDICTION, and prediction as payload', () => {
      expect(updatePrediction(prediction)).toEqual(expected);
      expect(updatePrediction(prediction).payload).toEqual(prediction);
      expect(updatePrediction(prediction).type).toEqual(
        ActionType.UPDATE_PREDICTION,
      );
    });
  });
});
