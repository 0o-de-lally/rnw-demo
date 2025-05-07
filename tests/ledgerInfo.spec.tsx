import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import App from "../src/App";

test("ledger info", async () => {
  const screen = render(<App />);

  await expect.element(screen.getByText("Chain ID")).toBeVisible();
});
