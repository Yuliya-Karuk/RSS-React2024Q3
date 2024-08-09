import { Pagination } from '@components/Pagination/Pagination';
import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, it } from 'vitest';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <Pagination currentPage={1} totalPages={10} />,
  },
]);

// const useRouterPushMock = vi.fn();

// vi.mock('@remix-run/react'', () => ({
//   useRouter: () => ({
//     push: useRouterPushMock,
//   }),
//   usePathname: () => '/',
//   useSearchParams: () => ({
//     get: (key: string) => {
//       const params = new URLSearchParams('details=1');
//       return params.get(key);
//     },
//   }),
// }));

// const searchParamsMock = vi.fn;
const setSearchParamsMock = () => vi.fn;

// vi.mock('@remix-run/react', () => ({
//   useSearchParams: () => [searchParamsMock, setSearchParamsMock],
// }));

vi.mock('@remix-run/react', async () => ({
  ...(await vi.importActual('@remix-run/react')),
  useSearchParams: () => [() => new URLSearchParams('page=2'), setSearchParamsMock],
}));

describe('Pagination', () => {
  it('disables previous and first buttons on the first page', () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const firstPageButton = screen.getByRole('button', { name: /First/i });
    const previousPageButton = screen.getByRole('button', { name: /Previous/i });

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
  });

  it('disables next and last buttons on the last page', () => {
    const RemixStubSecond = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination currentPage={10} totalPages={10} />,
      },
    ]);

    renderWithProviders(<RemixStubSecond initialEntries={['/']} />);

    const nextPageButton = screen.getByRole('button', { name: /Next/i });
    const lastPageButton = screen.getByRole('button', { name: /Last/i });

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  // it.only('updates URL query parameter when specific page button is clicked - 1', async () => {
  //   renderWithProviders(<RemixStub initialEntries={['/']} />);

  //   const nextPageButton = await screen.findByRole('button', { name: /Next/i });

  //   const user = userEvent.setup();

  //   await user.click(nextPageButton);

  //   expect(setSearchParamsMock).toHaveBeenCalled();
  // });

  // it('updates URL query parameter when specific page button is clicked - 2', async () => {
  //   renderWithProviders(<RemixStub initialEntries={['/']} />);

  //   const pageButton = screen.getByText('3');
  //   const user = userEvent.setup();
  //   await user.click(pageButton);

  //   expect(useRouterPushMock).toHaveBeenCalledWith(expect.stringContaining('?page=3'));
  // });
});
