import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer'; // Убедитесь, что путь корректен

describe('Footer Component', () => {
  it('should render correctly and contain all required elements', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('© 2024 Data sourced from the')).toBeInTheDocument();
    expect(screen.getByText('SWAPI API')).toBeInTheDocument();
    expect(screen.getByLabelText('link to github')).toBeInTheDocument();
  });
});
