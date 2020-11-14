export const APP_LOADING = 'APP_LOADING';
export const APP_DONE_LOADING = 'APP_DONE_LOADING';
export const SET_MESSAGE = 'SET_MESSAGE';

export type AppState = {
  loading: boolean;
  message: Message | null;
};

export type GetState = () => AppState;

export type Message = {
  severity: 'success' | 'info' | 'warning' | 'error';
  text: string;
};

export type AppLoading = {
  type: typeof APP_LOADING;
};

export type AppDoneLoading = {
  type: typeof APP_DONE_LOADING;
};

export type SetMessage = {
  type: typeof SET_MESSAGE;
  payload: Message;
};

export type AppStateTypes = AppLoading | AppDoneLoading | SetMessage;
