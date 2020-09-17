import { fixture, expect, html } from "@open-wc/testing";
import "../dist/auro-thing";

describe("auro-thing", () => {
  it("says hello", async () => {
    const el = await fixture(
      html`<auro-thing>Hello!</auro-thing>`
    );

    expect(el.textContent).to.contain("Hello!");
  });
});
