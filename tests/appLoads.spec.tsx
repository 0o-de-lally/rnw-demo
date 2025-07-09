import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import App from "../src/App";

test("can open app", async () => {
  // force history to start at root
  window.history.pushState({}, "Test", "/");
  const screen = render(<App />);

  await expect.element(screen.getByText("Explorer")).toBeVisible();
  // TODO: the page loads but then becomes blank
});
