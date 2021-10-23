const {
  getLastMondayAsTimeStamp,
  getLastMondayHelper,
  getNowAsTimeStamp,
  getTodayAsNumber,
  isTodayAMonday,
} = require('../../../src/utils/helpers/getLastMonday.helpers');

describe('getLastMonday.helpers', () => {
  describe('getLastMondayAsTimeStamp', () => {
    test('should return current timestamp if today is Monday', () => {
      // MONDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-25T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getLastMondayAsTimeStamp(now)).toBe(1635159600);
    });
    test('should return timestamp of Monday if today is not Monday', () => {
      // WEDNESDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-27T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getLastMondayAsTimeStamp(now)).toBe(1635159600);
    });
  });

  describe('getNowAsTimeStamp', () => {
    test('should return a timestamp', () => {
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-25T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getNowAsTimeStamp(now)).toBe(1635159600);
    });
    test('should return another timestamp', () => {
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-26T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getNowAsTimeStamp(now)).not.toBe(1635159600);
    });
  });

  describe('getTodayAsNumber', () => {
    test('should return 7 if day is Sunday', () => {
      // SUNDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() => new Date('2021-10-24').valueOf());
      const now = new Date(Date.now());
      expect(getTodayAsNumber(now)).toBe(7);
    });
    test('should return 1 if day is Monday', () => {
      // MONDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() => new Date('2021-10-25').valueOf());
      const now = new Date(Date.now());
      expect(getTodayAsNumber(now)).toBe(1);
    });
    test('should return 2 if day is Tuesday', () => {
      // TUESDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() => new Date('2021-10-26').valueOf());
      const now = new Date(Date.now());
      expect(getTodayAsNumber(now)).toBe(2);
    });
  });

  describe('isTodayAMonday', () => {
    test('should return true if today is a Monday', () => {
      // MONDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() => new Date('2021-10-25').valueOf());
      const now = new Date(Date.now());
      expect(isTodayAMonday(now)).toBe(true);
    });
    test('should return false if today is not a Monday', () => {
      // TUESDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() => new Date('2021-10-26').valueOf());
      const now = new Date(Date.now());
      expect(isTodayAMonday(now)).toBe(false);
    });
  });

  describe('getLastMondayHelper', () => {
    test('should return last Monday if today is not Monday', () => {
      // THURSDAY
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-28T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getLastMondayHelper(now)).toBe(1635159600);
    });
    test('should return current timestamp if today is Monday', () => {
      // MONDAY;
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2021-10-25T11:00:00.000Z').valueOf(),
        );
      const now = new Date(Date.now());
      expect(getLastMondayHelper(now)).toBe(1635159600);
    });
  });
});
