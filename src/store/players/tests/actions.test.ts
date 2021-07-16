import {
  IPlayer,
  IPlayerProfile,
  IScoresPlayer,
} from '../../../models/player.model';
import {
  ActionType,
  AddNewPlayer,
  DeletePlayer,
  ResetPlayers,
  StoreAllPlayers,
  StorePlayerProfile,
  StorePlayerScores,
  UpdateAdminStatus,
} from '../action-types';
import {
  addNewPlayer,
  deletePlayer,
  resetPlayers,
  storeAllPlayers,
  storePlayerProfile,
  storePlayerScores,
  updateAdminStatus,
} from '../actions';

describe('#playersState', () => {
  describe('#addNewPlayer w/ player', () => {
    const player: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player',
      id: 1,
      lastName: 'tst_player',
      phoneNumber: '123',
      team: {
        id: 1,
        logo: 'test_logo',
        name: 'test_name',
      },
      totaalToto: true,
      userName: 'TEST',
    };
    const expected: AddNewPlayer = {
      type: ActionType.ADD_NEW_PLAYER,
      payload: player,
    };

    test('returns an action w/ type ADD_NEW_PLAYER and player as payload', () => {
      expect(addNewPlayer(player)).toEqual(expected);
      expect(addNewPlayer(player).type).toEqual(ActionType.ADD_NEW_PLAYER);
      expect(addNewPlayer(player).payload).toEqual(player);
    });
  });

  describe('#storeAllPlayers w/ players', () => {
    const players: IPlayer[] = [
      {
        admin: false,
        email: 'test@test.com',
        firstName: 'test_player',
        id: 1,
        lastName: 'tst_player',
        phoneNumber: '123',
        team: {
          id: 1,
          logo: 'test_logo',
          name: 'test_name',
        },
        totaalToto: true,
        userName: 'TEST',
      },
    ];
    const expected: StoreAllPlayers = {
      type: ActionType.STORE_ALL_PLAYERS,
      payload: players,
    };

    test('returns an action w/ type STORE_ALL_PLAYERS and players as payload', () => {
      expect(storeAllPlayers(players)).toEqual(expected);
      expect(storeAllPlayers(players).type).toEqual(
        ActionType.STORE_ALL_PLAYERS,
      );
      expect(storeAllPlayers(players).payload).toEqual(players);
    });
  });

  describe('#deletePlayer w/ players', () => {
    const playerId = 1;
    const expected: DeletePlayer = {
      type: ActionType.DELETE_PLAYER,
      payload: playerId,
    };

    test('returns an action w/ type DELETE_PLAYER and a playerId as payload', () => {
      expect(deletePlayer(playerId)).toEqual(expected);
      expect(deletePlayer(playerId).type).toEqual(ActionType.DELETE_PLAYER);
      expect(deletePlayer(playerId).payload).toEqual(playerId);
    });
  });

  describe('#storePlayerProfile w/ profile', () => {
    const playerProfile: IPlayerProfile = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player',
      id: 1,
      lastName: 'tst_player',
      phoneNumber: '123',
      team: {
        id: 1,
        logo: 'test_logo',
        name: 'test_name',
      },
      totaalToto: true,
      userName: 'TEST',
      pastFixturesWithScores: null,
    };
    const expected: StorePlayerProfile = {
      type: ActionType.STORE_PLAYER_PROFILE,
      payload: playerProfile,
    };

    test('returns an action w/ type STORE_PLAYER_PROFILE and a profile as payload', () => {
      expect(storePlayerProfile(playerProfile)).toEqual(expected);
      expect(storePlayerProfile(playerProfile).type).toEqual(
        ActionType.STORE_PLAYER_PROFILE,
      );
      expect(storePlayerProfile(playerProfile).payload).toEqual(playerProfile);
    });
  });

  describe('#playerScoresFetched w/ scores', () => {
    const scoresPlayer: IScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      userId: 1,
    };
    const expected: StorePlayerScores = {
      type: ActionType.STORE_PLAYER_SCORES,
      payload: scoresPlayer,
    };

    test('returns an action w/ type STORE_PLAYER_SCORES and scores as payload', () => {
      expect(storePlayerScores(scoresPlayer)).toEqual(expected);
      expect(storePlayerScores(scoresPlayer).type).toEqual(
        ActionType.STORE_PLAYER_SCORES,
      );
      expect(storePlayerScores(scoresPlayer).payload).toEqual(scoresPlayer);
    });
  });

  describe('#resetPlayers', () => {
    const expected: ResetPlayers = {
      type: ActionType.RESET_PLAYERS,
    };

    test('returns an action w/ type RESET_PLAYERS and no payload', () => {
      expect(resetPlayers()).toEqual(expected);
      expect(resetPlayers()).not.toHaveProperty('payload');
      expect(resetPlayers().type).toEqual(ActionType.RESET_PLAYERS);
    });
  });

  describe('#updateAdminStatus w/ player', () => {
    const player: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player1',
      id: 1,
      lastName: 'tst_player',
      phoneNumber: '123',
      team: {
        id: 1,
        logo: 'test_logo',
        name: 'test_name',
      },
      totaalToto: true,
      userName: 'TEST',
    };
    const expected: UpdateAdminStatus = {
      type: ActionType.UPDATE_ADMIN_STATUS,
      payload: player,
    };

    test('returns an action w/ type UPDATE_ADMIN_STATUS and a player as payload', () => {
      expect(updateAdminStatus(player)).toEqual(expected);
      expect(updateAdminStatus(player).type).toEqual(
        ActionType.UPDATE_ADMIN_STATUS,
      );
      expect(updateAdminStatus(player).payload).toEqual(player);
    });
  });
});
