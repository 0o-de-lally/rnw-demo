import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import LedgerInfoView from "../src/components/LedgerInfo";

test("ledger info test", async () => {
  const screen = render(<LedgerInfoView />);

  await expect.element(screen.getByText("Chain ID")).toBeVisible();
});
