import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const data = { a: 1, b: 2, action: Action.Add };
    expect(simpleCalculator(data)).toBe(3);
  });

  test('should subtract two numbers', () => {
    const data = { a: 10, b: 6, action: Action.Subtract };
    expect(simpleCalculator(data)).toBe(4);
  });

  test('should multiply two numbers', () => {
    const data = { a: 3, b: 5, action: Action.Multiply };
    expect(simpleCalculator(data)).toBe(15);
  });

  test('should divide two numbers', () => {
    const data = { a: 8, b: 4, action: Action.Divide };
    expect(simpleCalculator(data)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const data = { a: 3, b: 2, action: Action.Exponentiate };
    expect(simpleCalculator(data)).toBe(9);
  });

  test('should return null for invalid action', () => {
    const data = { a: 1, b: 2, action: '%' };
    expect(simpleCalculator(data)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const data = { a: 'one', b: null, action: Action.Add };
    expect(simpleCalculator(data)).toBeNull();
  });
});
