import { IPlayer } from '../../../models/player.model';
import { addNewPlayer } from '../actions';
import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  PLAYER_PROFILE_FETCHED,
  REMOVE_ALL_PLAYERS,
  PlayersState,
  AddNewPlayer,
  AllPlayersFetched,
  PlayerProfileFetched,
  RemoveAllPlayers,
} from '../types';

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
      type: ADD_NEW_PLAYER,
      player,
    };
    test('returns an action w/ type ADD_NEW_PLAYER and player as payload', () => {
      expect(addNewPlayer(player)).toEqual(expected);
      expect(addNewPlayer(player).player).not.toBe(undefined);
    });
  });
});
