import { useFlag } from './index';

describe('useFlag', () => {
  it('Without signature flag will equal to false', () => {
    const [flag, _] = useFlag();

    expect(flag.value).toEqual(false);
  });
});
