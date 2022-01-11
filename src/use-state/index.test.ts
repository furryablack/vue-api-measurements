import { shallowMount } from "@vue/test-utils";
import { useState } from "./index";

describe("useState", () => {
  it("User state has expected value", () => {
    const userShame = {id: 123, name: "Fu Shame"};

    const wrapper = shallowMount({
      template: `<div id="app" />`,

      setup() {
        const [user] = useState(userShame);
        return {user};
      },
    });

    expect(wrapper.vm.user).toEqual(userShame);
  });
});
