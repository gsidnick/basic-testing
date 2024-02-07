// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toBeCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(setInterval).toBeCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const file = 'test-file.txt';
    await readFileAsynchronously(file);

    expect(joinSpy).toBeCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const file = 'test-file.txt';
    const result = await readFileAsynchronously(file);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const file = 'test-file.txt';
    const fileContent = 'NodeJS RSS Course';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);
    const result = await readFileAsynchronously(file);

    expect(result).toBe(fileContent);
  });
});
