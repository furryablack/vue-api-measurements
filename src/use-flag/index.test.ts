import { shallowMount } from "@vue/test-utils";
import { useFlag } from "./index";

describe("useFlag", () => {
  it("Boolean flags have expected values", () => {
    const wrapper = shallowMount({
      template: `<div id="app" />`,

      setup() {
        const [flagLeft] = useFlag();
        const [flagRight] = useFlag(true);
        return {flagLeft, flagRight}
      },
    });

    expect(wrapper.vm.flagLeft).toEqual(false);
    expect(wrapper.vm.flagRight).toEqual(true);
  });
});
