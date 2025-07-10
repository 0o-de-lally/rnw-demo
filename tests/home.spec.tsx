import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import HomeScreen from "../src/screens/HomeScreen";
import { MemoryRouter } from "react-router-dom";

test("home renders", async () => {
  const screen = render(
    <MemoryRouter>
      <HomeScreen />
    </MemoryRouter>,
  );

  await expect.element(screen.getByText("Explorer")).toBeVisible();
});
