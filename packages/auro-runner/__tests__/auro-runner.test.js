import { fixture, expect, html } from "@open-wc/testing";
import "../dist/auro-runner";

describe("auro-runner", () => {
  it("says hello", async () => {
    const el = await fixture(html`<auro-runner>Hello!</auro-runner>`);

    expect(el.textContent).to.contain("Hello!");
  });
});
