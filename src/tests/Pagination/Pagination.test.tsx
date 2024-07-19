import { Pagination } from '@components/Pagination/Pagination';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('Pagination', () => {
  const renderWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('disables previous and first buttons on the first page', () => {
    renderWithRouter(<Pagination currentPage={1} totalPages={10} />, {
      route: '/?page=1',
    });

    const firstPageButton = screen.getByRole('button', { name: /First/i });
    const previousPageButton = screen.getByRole('button', { name: /Previous/i });

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
  });

  it('disables next and last buttons on the last page', () => {
    renderWithRouter(<Pagination currentPage={10} totalPages={10} />, {
      route: '/?page=10',
    });

    const nextPageButton = screen.getByRole('button', { name: /Next/i });
    const lastPageButton = screen.getByRole('button', { name: /Last/i });

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });
});
