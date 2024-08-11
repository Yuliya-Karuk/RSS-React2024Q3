import { render, screen } from '@testing-library/react';
import { ClassAttributes, ImgHTMLAttributes } from 'react';
import { describe, expect, it } from 'vitest';
import { Loader } from './Loader';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} alt="mock" />,
}));

describe('Loader Component', () => {
  it('renders the Loader component', () => {
    render(<Loader />);

    const loaderImage = screen.getByTestId('loader');
    expect(loaderImage).toBeInTheDocument();
  });

  it('renders the Loader with provided style', () => {
    const customStyle = { width: '50px', height: '50px' };

    render(<Loader style={customStyle} />);

    const loaderImage = screen.getByTestId('loader');
    expect(loaderImage).toHaveStyle(customStyle);
  });

  it('renders the Loader image with correct src and alt attributes', () => {
    render(<Loader />);

    const loaderImage = screen.getByTestId('loader');
    expect(loaderImage).toHaveAttribute('src', '/loader.gif');
    expect(loaderImage).toHaveAttribute('alt', 'mock');
  });
});
