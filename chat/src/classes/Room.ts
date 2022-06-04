export class Room {
  roomId: number
  roomTitle: string
  namespace: string
  privateRoom: boolean
  history: Array<{ [key: string]: any }>

  constructor(
    roomId: number,
    roomTitle: string,
    namespace: string,
    privateRoom = false
  ) {
    this.roomId = roomId
    this.roomTitle = roomTitle
    this.namespace = namespace
    this.privateRoom = privateRoom
    this.history = []
  }
  addMessage(message: { [key: string]: any }) {
    this.history.push(message)
  }
  clearHistory() {
    this.history = []
  }
}
