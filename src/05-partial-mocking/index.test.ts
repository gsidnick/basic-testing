import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => ({
  __esModule: true,
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();

    expect(consoleLogSpy).toBeCalled();
    expect(consoleLogSpy).toBeCalledWith('I am not mocked');
  });
});
