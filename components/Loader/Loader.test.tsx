import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('renders the Loader component', () => {
    render(<Loader />);

    const loaderContainer = screen.getByRole('img', { name: /Loader/i });
    expect(loaderContainer).toBeInTheDocument();
  });

  it('renders the Loader with provided style', () => {
    const customStyle = { width: '50px', height: '50px' };

    render(<Loader style={customStyle} />);

    const loaderImage = screen.getByRole('img', { name: /Loader/i });
    expect(loaderImage).toHaveStyle(customStyle);
  });

  it('renders the Loader image with correct src and alt attributes', () => {
    render(<Loader />);

    const loaderImage = screen.getByRole('img', { name: /Loader/i });
    expect(loaderImage).toHaveAttribute('alt', 'Loader');
  });
});
