import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import App from '../src/App';

test('can open app', async () => {
  const screen = render(<App />);

  await expect.element(screen.getByText('Explorer')).toBeVisible()
})
