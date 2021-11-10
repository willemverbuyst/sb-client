export interface IMessage {
  severity: Severity
  text: string
}

export type Severity = 'success' | 'info' | 'warning' | 'error'
