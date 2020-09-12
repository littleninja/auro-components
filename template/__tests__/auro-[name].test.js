import { fixture, expect, html } from "@open-wc/testing";
import "../src/auro-[name]";

describe("auro-[name]", () => {
  it("says hello", async () => {
    const el = await fixture(html`<auro-[name]>Hello!</auro-[name]>`);

    expect(el.textContent).to.contain("Hello!");
  });
});
