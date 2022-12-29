import { AB } from '.';

describe('Errors to be thrown', () => {
  it('should throw an error if no arguments are provided', () => {
    expect(() => AB()).toThrow();
  });

  it('should throw an error if only one argument is provided', () => {
    expect(() => AB(() => {})).toThrow();
  });

  it('should throw if last argument is not an array', () => {
    expect(() =>
      AB(
        () => {},
        () => {},
        'not an array'
      )
    ).toThrow();
  });

  it('should throw if the number of weights is not equal to the number of functions', () => {
    expect(() =>
      AB(
        () => {},
        () => {},
        () => {},
        [1, 2]
      )
    ).toThrow();
  });

  it('should throw if any weight is not a number', () => {
    expect(() =>
      AB(
        () => {},
        () => {},
        [1, 'not a number']
      )
    ).toThrow();
  });

  it('should throw if any weight is negative', () => {
    expect(() =>
      AB(
        () => {},
        () => {},
        [1, -1]
      )
    ).toThrow();
  });

  it('should throw if any argument except the last is not a function', () => {
    expect(() =>
      AB(
        () => {},
        () => {},
        [1, 1],
        [1, 1, 1]
      )
    ).toThrow();
  });
});

describe('AB function', () => {
  it('should return a function', () => {
    expect(
      typeof AB(
        () => {},
        () => {},
        [1, 1]
      )
    ).toBe('function');
  });

  it('should return the first function if the random number is less than the first weight', () => {
    Math.random = jest.fn().mockReturnValueOnce(0.1);
    const fn1 = () => 'a';
    const fn2 = () => 'b';
    const result = AB(fn1, fn2, [1, 1])();
    expect(result).toBe('a');
  });

  it('should return the second function if the random number is greater than the first weight', () => {
    Math.random = jest.fn().mockReturnValueOnce(0.5);
    const fn1 = () => 'a';
    const fn2 = () => 'b';
    const result = AB(fn1, fn2, [0.3, 0.7])();
    expect(result).toBe('b');
  });

  it('should return the first function if the random number is equal to the first weight', () => {
    Math.random = jest.fn().mockReturnValueOnce(0.5);
    const fn1 = () => 'a';
    const fn2 = () => 'b';
    const result = AB(fn1, fn2, [0.5, 0.5])();
    expect(result).toBe('a');
  });
});
