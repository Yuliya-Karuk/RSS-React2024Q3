import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('displays error message and reload button on error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong. Refresh the page, please.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('reloads the page when reload button is clicked', () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /reload/i });
    fireEvent.click(reloadButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
