import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi } from 'vitest';
import { ThemeSwitcher } from './ThemeSwitcher';

const toggleThemeMock = vi.fn();

vi.mock('@contexts/themeProvider', () => ({
  useTheme: vi.fn(() => ({
    toggleTheme: toggleThemeMock,
  })),
}));

describe('ThemeSwitcher Component', () => {
  it.only('should toggle theme when checkbox is clicked', async () => {
    render(<ThemeSwitcher />);

    const user = userEvent.setup();
    const checkbox = await screen.findByRole('checkbox');

    await user.click(checkbox);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
