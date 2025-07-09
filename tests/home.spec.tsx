import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import HomeScreen from "../src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

test("home renders", async () => {
  const screen = render(
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>,
  );

  await expect.element(screen.getByText("Explorer")).toBeVisible();
});
