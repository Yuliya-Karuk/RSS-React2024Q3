import { createRemixStub } from '@remix-run/testing';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import { NotFound } from './notFound';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <NotFound />,
  },
]);

describe('NotFoundComponent', () => {
  it('renders all required components', () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    expect(screen.getByText('Back to Home page')).toBeInTheDocument();
  });
});
