import { UserState } from './types';

export const selectUser = (state: UserState) => {
  console.log(state.user);
  return state.user;
};
