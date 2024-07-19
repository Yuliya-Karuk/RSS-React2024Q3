import { Details } from '@components/Details/Details';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter, mockDetails, mockedFilm } from 'src/testSetup/msw/mocks';
import { vi } from 'vitest';

describe('CharacterItem click handling', () => {
  beforeEach(() => {
    vi.mock('@contexts/dataProvider', () => ({
      useData: () => ({
        data: {
          results: [mockCharacter],
        },
        isLoading: true,
        totalPages: 1,
        fetchData: vitest.fn(),
        films: [mockedFilm],
      }),
    }));

    vi.mock('@contexts/toastProvider', () => ({
      useToast: () => ({
        errorNotify: vi.fn(),
      }),
    }));
  });

  it('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();

    await screen.findByText(mockDetails.name);
    const loaderAfterLoad = screen.queryByTestId('loader');
    expect(loaderAfterLoad).not.toBeInTheDocument();
  });
});
