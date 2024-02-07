import axios from 'axios';
import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

const url = 'users';
const response = {
  data: [
    { id: 1, name: 'Leanne Graham' },
    { id: 2, name: 'Ervin Howell' },
    { id: 3, name: 'Clementine Bauch' },
    { id: 4, name: 'Patricia Lebsack' },
  ],
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(response);
    jest.spyOn(lodash, 'throttle').mockImplementation((fn) => fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spyAxiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(url);
    jest.runAllTimers();

    expect(spyAxiosCreate).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosGet = jest.spyOn(axios, 'get');
    await throttledGetDataFromApi(url);
    jest.runAllTimers();

    expect(spyAxiosGet).toBeCalledWith(url);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(url);
    jest.runAllTimers();

    expect(result).toStrictEqual(response.data);
  });
});
