import { useFlag } from "./index";

describe("useFlag", () => {
  it("Creation without signature will equal to false", () => {
    const [flag] = useFlag();
    expect(flag.value).toEqual(false);
  });

  it("Creation with truthly signature will equal to true", () => {
    const fetchedItems = [{id: 1}];
    const [flag] = useFlag(Boolean(fetchedItems.length));
    expect(flag.value).toEqual(true);
  });

  it("flagApi.set works as expected", () => {
    const [hasItems, {set: setHasItems}] = useFlag();
    const fetchedItems = [{id: 1}];
    setHasItems(Boolean(fetchedItems.length));
    expect(hasItems.value).toEqual(true);
  });

  it("flagApi.toggle works as expected", () => {
    const [flag, {toggle}] = useFlag();
    expect(flag.value).toEqual(false);
    toggle();
    expect(flag.value).toEqual(true);
  });

  it("flagApi.setTrue works as expected", () => {
    const [flag, {setTrue}] = useFlag(false);
    expect(flag.value).toEqual(false);
    setTrue();
    expect(flag.value).toEqual(true);
  });

  it("flagApi.setFalse works as expected", () => {
    const [flag, {setFalse}] = useFlag(true);
    expect(flag.value).toEqual(true);
    setFalse();
    expect(flag.value).toEqual(false);
  });

  it("flagApi.reset works as expected", () => {
    const [flag, {toggle, reset}] = useFlag();
    expect(flag.value).toEqual(false);
    toggle();
    expect(flag.value).toEqual(true);
    reset();
    expect(flag.value).toEqual(false);
  });
});
