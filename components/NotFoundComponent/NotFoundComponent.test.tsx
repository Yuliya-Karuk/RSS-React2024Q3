import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import NotFoundComponent from './NotFoundComponent';

describe('NotFoundComponent', () => {
  it('renders all required components', () => {
    renderWithProviders(<NotFoundComponent />);

    expect(screen.getByText('Back to Home page')).toBeInTheDocument();
  });
});
