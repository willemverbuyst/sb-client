const isValidOpenToBet = require('./openToBet.validator');

describe('isValidOpenToBet', () => {
  test('returns false if current and event timestamp are equal', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-10-25T11:00:00.000Z').valueOf(),
      );
    const testCurrentTimeStamp = Math.floor(Date.now() / 1000);
    expect(isValidOpenToBet(testCurrentTimeStamp, testCurrentTimeStamp)).toBe(
      false,
    );
  });
  test('returns false if time between current and event timestamp is less than 5 minutes', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-10-25T11:00:00.000Z').valueOf(),
      );
    const testCurrentTimeStamp = Math.floor(Date.now() / 1000);
    const testEventTimeStamp = Math.floor(
      new Date('2021-10-25T11:04:00.000Z').valueOf() / 1000,
    );
    expect(isValidOpenToBet(testCurrentTimeStamp, testEventTimeStamp)).toBe(
      false,
    );
  });
  test('returns true if current time is more than 5 minutes bfore event ', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-10-25T11:00:00.000Z').valueOf(),
      );
    const testCurrentTimeStamp = Math.floor(Date.now() / 1000);
    const testEventTimeStamp = Math.floor(
      new Date('2021-10-25T11:06:00.000Z').valueOf() / 1000,
    );
    expect(isValidOpenToBet(testCurrentTimeStamp, testEventTimeStamp)).toBe(
      true,
    );
  });
});
