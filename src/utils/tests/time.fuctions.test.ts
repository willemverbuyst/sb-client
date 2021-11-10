import {
  formatTimeStampToLocalDate,
  getTimeFromTimeStamp,
  hasBettingClosed,
} from '../time.functions'

describe('#getTimeFromTimeStamp', () => {
  describe('if given a timestamp', () => {
    const timeStampTest1 = 1610206200
    const timeStampTest2 = 1610206500
    const timeStampTest3 = 1610204400
    const timeStampTest4 = 1610204700
    const timeStampTest5 = timeStampTest4 - 24 * 60 * 60

    test('returns a time (hh:mm)', () => {
      expect(getTimeFromTimeStamp(timeStampTest1)).toBe('16:30')
      expect(getTimeFromTimeStamp(timeStampTest2)).toBe('16:35')
      expect(getTimeFromTimeStamp(timeStampTest3)).toBe('16:00')
      expect(getTimeFromTimeStamp(timeStampTest4)).toBe('16:05')
      expect(getTimeFromTimeStamp(timeStampTest5)).toBe(
        getTimeFromTimeStamp(timeStampTest4)
      )
    })
  })
})

describe('#formatTimeStampToLocalDate', () => {
  describe('if given a timestamp', () => {
    const timeStampTest = 1610206200

    test('returns a formatted date', () => {
      expect(
        formatTimeStampToLocalDate(timeStampTest).toLocaleUpperCase()
      ).toBe('ZATERDAG 9 JANUARI 2021')
    })
  })
})

describe('#hasBettingClosed ', () => {
  describe('if given a timestamp', () => {
    const timeStampOne = 1610206200
    // 1910206200 = Sat Jul 13 2030
    const timeStampTwo = 1910206200

    test('returns true or false', () => {
      expect(hasBettingClosed(timeStampOne)).toBe(true)
      expect(hasBettingClosed(timeStampTwo)).toBe(false)
    })
  })
})
