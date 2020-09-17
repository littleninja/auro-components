import { fixture, expect, html } from "@open-wc/testing";
import "../dist/[namespace]-[name]";

describe("[namespace]-[name]", () => {
  it("says hello", async () => {
    const el = await fixture(
      html`<[namespace]-[name]>Hello!</[namespace]-[name]>`
    );

    expect(el.textContent).to.contain("Hello!");
  });
});
