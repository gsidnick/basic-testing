import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([{}, 'check', 100, null]);
    expect(linkedList).toStrictEqual({
      next: {
        next: {
          next: {
            next: {
              next: null,
              value: null,
            },
            value: null,
          },
          value: 100,
        },
        value: 'check',
      },
      value: {},
    });
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([true, 20, 'element', {}]);
    expect(linkedList).toMatchSnapshot();
  });
});
