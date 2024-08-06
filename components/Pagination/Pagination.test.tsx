import { Pagination } from '@components/Pagination/Pagination';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, it } from 'vitest';

const useRouterPushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: useRouterPushMock,
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: (key: string) => {
      const params = new URLSearchParams('details=1');
      return params.get(key);
    },
  }),
}));

describe('Pagination', () => {
  it('disables previous and first buttons on the first page', () => {
    renderWithProviders(<Pagination currentPage={1} totalPages={10} />);

    const firstPageButton = screen.getByRole('button', { name: /First/i });
    const previousPageButton = screen.getByRole('button', { name: /Previous/i });

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
  });

  it('disables next and last buttons on the last page', () => {
    renderWithProviders(<Pagination currentPage={10} totalPages={10} />);

    const nextPageButton = screen.getByRole('button', { name: /Next/i });
    const lastPageButton = screen.getByRole('button', { name: /Last/i });

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it('updates URL query parameter when specific page button is clicked - 1', async () => {
    renderWithProviders(<Pagination currentPage={1} totalPages={10} />);

    const nextPageButton = await screen.findByRole('button', { name: /Next/i });

    const user = userEvent.setup();

    await user.click(nextPageButton);

    expect(useRouterPushMock).toHaveBeenCalledWith(expect.stringContaining('?page=2'));
  });

  it('updates URL query parameter when specific page button is clicked - 2', async () => {
    renderWithProviders(<Pagination currentPage={1} totalPages={10} />);

    const pageButton = screen.getByText('3');
    const user = userEvent.setup();
    await user.click(pageButton);

    expect(useRouterPushMock).toHaveBeenCalledWith(expect.stringContaining('?page=3'));
  });
});
