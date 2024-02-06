import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 3, action: Action.Add, expected: 6 },
  { a: 4, b: 3, action: Action.Add, expected: 7 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 2, b: 6, action: Action.Exponentiate, expected: 64 },
  { a: 1, b: 2, action: '%', expected: null },
  { a: 1, b: 2, action: '#', expected: null },
  { a: 1, b: 2, action: '&', expected: null },
  { a: 1, b: 2, action: '@', expected: null },
  { a: 1, b: 2, action: '|', expected: null },
  { a: 'one', b: 'two', action: Action.Add, expected: null },
  { a: 'one', b: 2, action: Action.Subtract, expected: null },
  { a: undefined, b: null, action: Action.Multiply, expected: null },
  { a: 2, b: {}, action: Action.Divide, expected: null },
  { a: 1, b: [], action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('pattern', (data) => {
    const { a, b, action } = data;
    expect(simpleCalculator({ a, b, action })).toBe(data.expected);
  });
});
