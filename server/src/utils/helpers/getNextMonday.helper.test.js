const getNextMonday = require('./getNextMonday.helper');

describe('getNextMonday.helpers', () => {
  describe('getNextMonday', () => {
    test('should return timestamp next Monday if today is Monday', () => {
      // MONDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-18T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getNextMonday(now)).toBe(1635159600);
    });
    test('should return timestamp next Monday if today is not Monday', () => {
      // WEDNESDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-20T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getNextMonday(now)).toBe(1635159600);
    });
  });
});
