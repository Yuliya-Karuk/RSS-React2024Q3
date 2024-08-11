import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, it } from 'vitest';
import { Loader } from './Loader';

const customStyle = { width: '50px', height: '50px' };

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <Loader style={customStyle} />,
  },
]);

describe('Loader Component', () => {
  it('renders the Loader component', () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const loaderContainer = screen.getByRole('img', { name: /Loader/i });
    expect(loaderContainer).toBeInTheDocument();
  });

  it('renders the Loader with provided style', () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const loaderImage = screen.getByRole('img', { name: /Loader/i });
    expect(loaderImage).toHaveStyle(customStyle);
  });

  it('renders the Loader image with correct src and alt attributes', () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const loaderImage = screen.getByRole('img', { name: /Loader/i });
    expect(loaderImage).toHaveAttribute('alt', 'Loader');
  });
});
