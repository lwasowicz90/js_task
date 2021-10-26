import { percent2decimal, roundComission } from '../index.js';

describe('utils.percent2decimal', () => {
  it('converts 0 - left edge value', () => {
    const input = 0;
    const expected = 0;
    const result = percent2decimal(input);
    expect(result).toStrictEqual(expected);
  });

  it('converts middle value', () => {
    const input = 46.87;
    const expected = 0.4687;
    const result = percent2decimal(input);
    expect(result).toStrictEqual(expected);
  });

  it('converts 100 right edge value', () => {
    const input = 100;
    const expected = 1;
    const result = percent2decimal(input);
    expect(result).toStrictEqual(expected);
  });
});

describe('utils.roundComission', () => {
  it('rounds very small value, precision=2', () => {
    const input = 0.000000123;
    const expected = 0.01;
    const result = roundComission(input);
    expect(result).toStrictEqual(expected);
  });

  it('rounds casual value', () => {
    const input = 43.231;
    const expected = 43.24;
    const result = roundComission(input);
    expect(result).toStrictEqual(expected);
  });

  it('rounds big value', () => {
    const input = 12000000.0000021;
    const expected = 12000000.01;
    const result = roundComission(input);
    expect(result).toStrictEqual(expected);
  });
});
