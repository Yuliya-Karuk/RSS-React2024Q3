import { MainLayout } from '@components/MainLayout/MainLayout';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('MainLayout', () => {
  it('renders all required components', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainLayout />
      </MemoryRouter>
    );

    const headerLogo = screen.getByRole('img', { name: /Logo/i });
    expect(headerLogo).toBeInTheDocument();

    const footerText = screen.getByText('SWAPI API');
    expect(footerText).toBeInTheDocument();

    const errorButton = screen.getByText('Destroy the World');
    expect(errorButton).toBeInTheDocument();
  });
});
