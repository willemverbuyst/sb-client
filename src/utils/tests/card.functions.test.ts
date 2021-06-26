import { getPrivatePrediction, getTemporaryPrediction } from '../card.functions';

describe('if given goals or null', () => {
  test('returns a string with result or [ geen ]', () => {
    expect(getTemporaryPrediction(0, 0)).toBe(' [ 0 - 0 ] ');
    expect(getTemporaryPrediction(3, 9)).toBe(' [ 3 - 9 ] ');
    expect(getTemporaryPrediction(null, null)).toBe(' [ geen ] ');
  });
});

describe('if given goals or null', () => {
  test('returns a string with result or [ geen ]', () => {
    expect(getPrivatePrediction(0, 0, 'Match Finished', 1610206200)).toBe('Je voorspelling was 0 - 0');
    expect(getPrivatePrediction(null, null, 'Match Finished', 1610206200)).toBe('Geen voorspelling gedaan');
    expect(getPrivatePrediction(null, null, 'Not Started', 1910206200)).toBe('Nog geen voorspelling');
    // 1910206200 = Sat Jul 13 2030
    expect(getPrivatePrediction(3, 3, 'Not Started', 1910206200)).toBe('Je voorspelling is 3 - 3');
    expect(getPrivatePrediction(2, 2, 'Not Started', Math.floor(Date.now() / 1000) - 60)).toBe(
      'Voorspelling [ 2 - 2 ] gesloten',
    );
  });
});
