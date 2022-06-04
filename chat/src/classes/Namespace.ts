import { Room } from './Room'

export class Namespace {
  id: number
  img: string
  nsTitle: string
  endpoint: string
  rooms: Array<Room>
  constructor(id: number, nsTitle: string, img: string, endpoint: string) {
    this.id = id
    this.img = img
    this.nsTitle = nsTitle
    this.endpoint = endpoint
    this.rooms = []
  }

  addRoom(roomObj: Room) {
    this.rooms.push(roomObj)
  }
}
