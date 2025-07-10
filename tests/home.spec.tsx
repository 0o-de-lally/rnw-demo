import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import HomeScreen from "../src/screens/HomeScreen";

test("home renders", async () => {
  const screen = render(
    <HomeScreen />
  );

  await expect.element(screen.getByText("Explorer")).toBeVisible();
});
