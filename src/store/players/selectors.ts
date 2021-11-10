import { IPlayer } from '../../models/player.model'
import * as UTILS from '../../utils'
import { StoreState } from '../types'

export const selectPlayersSortedByName = (
  state: StoreState
): IPlayer[] | null => {
  if (state.playersState.players && state.playersState.players.length > 0) {
    const { players } = state.playersState
    const playersSortedByName = UTILS.sortArrayWithObjects<
      keyof IPlayer,
      IPlayer
    >('userName')('ascending')(players)
    return playersSortedByName
  }
  return null
}
