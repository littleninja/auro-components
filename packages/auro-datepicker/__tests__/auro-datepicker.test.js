import { fixture, expect, html } from "@open-wc/testing";
import "../dist/auro-datepicker";

describe("auro-datepicker", () => {
  it("says hello", async () => {
    const el = await fixture(html`<auro-datepicker>Hello!</auro-datepicker>`);

    expect(el.textContent).to.contain("Hello!");
  });
});
