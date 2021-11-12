import { useState } from './index';

describe('useState', () => {
  it('Ignore next value in the dispatch(next) with mapFn = (current, next) => current', () => {
    const mapFn = (current: number) => current + 1;

    const [acc, {dispatch: inc}] = useState<number>(0, mapFn);
    inc(1); // 1
    inc(2); // 2 instead of 3
    inc(4); // 3 instead of 7

    expect(acc.value).toEqual(3);
  });
});
