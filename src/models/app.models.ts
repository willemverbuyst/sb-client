export interface IMessage {
  severity: 'success' | 'info' | 'warning' | 'error';
  text: string;
}
