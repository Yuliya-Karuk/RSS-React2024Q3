import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, vi } from 'vitest';
import { ThemeSwitcher } from './ThemeSwitcher';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <ThemeSwitcher />,
  },
]);

const toggleThemeMock = vi.fn();

vi.mock('@contexts/themeProvider', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual ?? {}),
    useTheme: vi.fn(() => ({
      toggleTheme: toggleThemeMock,
    })),
  };
});

describe('ThemeSwitcher Component', () => {
  it.only('should toggle theme when checkbox is clicked', async () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const user = userEvent.setup();
    const checkbox = await screen.findByRole('checkbox');

    await user.click(checkbox);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
