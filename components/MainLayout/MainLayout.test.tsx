import { MainLayout } from '@components/MainLayout/MainLayout';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('MainLayout', () => {
  it('renders all required components', () => {
    renderWithProviders(
      <MainLayout>
        <div>Test Fragment</div>
      </MainLayout>
    );

    const headerLogo = screen.getByRole('img', { name: /Logo/i });
    expect(headerLogo).toBeInTheDocument();

    const footerText = screen.getByText('SWAPI API');
    expect(footerText).toBeInTheDocument();

    const errorButton = screen.getByText('Destroy the World');
    expect(errorButton).toBeInTheDocument();
  });
});
