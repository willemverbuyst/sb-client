import { getTimeFromTimeStamp, timeStampFormattedToLocalDate } from '../timeFunctions';

describe('if given a timestamp', () => {
  const timeStampTest = 1610206200;

  test('returns a time (hh:mm)', () => {
    expect(getTimeFromTimeStamp(timeStampTest)).toBe('16:30');
  });
});

describe('if given a timestamp', () => {
  const timeStampTest = 1610206200;

  test('returns a formatted date', () => {
    expect(timeStampFormattedToLocalDate(timeStampTest).toLocaleUpperCase()).toBe('ZATERDAG 9 JANUARI 2021');
  });
});
