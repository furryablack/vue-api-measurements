import { useState } from "./index";

describe("useState", () => {
  it("Creation with signature will equal to signature", () => {
    const [acc] = useState<number | null>(null);
    expect(acc.value).toEqual(null);
  });

  it("Creation with signature 3 will equal to 3", () => {
    const [acc] = useState<number>(3);
    expect(acc.value).toEqual(3);
  });

  it("stateApi.dispatch works as expected", () => {
    const [acc, { dispatch }] = useState<{ name: string }>({ name: "Furrya" });
    dispatch({ name: "Black" });
    expect(acc.value).toEqual({ name: "Black" });
  });

  it("stateApi.trigger works as expected", () => {
    const mk = (id: number) => ({id});

    const [
      acc,
      { trigger: inc },
    ] = useState<Array<ReturnType<typeof mk>> | null>(null, (current) => ([...(current ?? []), mk((current?.length || 0) + 1)]));

    inc();
    inc();
    inc();
    inc();

    expect(acc.value).toEqual([
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
    ]);
  });

  it("stateApi.reset works as expected", () => {
    const [acc, { dispatch, reset }] = useState<number>(1, (current) => current + 1);
    dispatch(100);
    expect(acc.value).toEqual(2);
    dispatch(50);
    expect(acc.value).toEqual(3);
    reset();
    expect(acc.value).toEqual(1);
  });

  it("mapFn: ignore next value with {dispatch}", () => {
    const [acc, { dispatch }] = useState<number>(1, (current) => current + 1);
    dispatch(100);
    expect(acc.value).toEqual(2);
    dispatch(50);
    expect(acc.value).toEqual(3);
  });
});
