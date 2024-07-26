import { Favorites } from '@components/Favorites/Favorites';
import { store } from '@store/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockedFavorites } from 'src/testSetup/msw/mocks';
import { vi } from 'vitest';

const handleRemoveAllMock = vi.fn();

vi.mock('@hooks/useHandleFlyout', () => ({
  useHandleFlyout: vi.fn(() => ({
    downloadUrl: 'http://example.com/1_characters.csv',
    handleRemoveAll: handleRemoveAllMock,
  })),
}));

describe('Favorites Component', () => {
  it('should display the list of favorite items', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites favorites={mockedFavorites} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('(1 selected)')).toBeInTheDocument();

    expect(screen.getByText(/Luke Skywalker Mocked/i)).toBeInTheDocument();
  });

  it('should call handleRemoveAll when the remove all button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites favorites={mockedFavorites} />
        </MemoryRouter>
      </Provider>
    );

    const removeAllButton = screen.getByLabelText('remove all');

    const user = userEvent.setup();
    await user.click(removeAllButton);

    expect(handleRemoveAllMock).toHaveBeenCalled();
  });

  it('should have a download link with correct href', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites favorites={mockedFavorites} />
        </MemoryRouter>
      </Provider>
    );

    const downloadLink = screen.getByLabelText('download');
    expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
    expect(downloadLink).toHaveAttribute('href', 'http://example.com/1_characters.csv');
  });
});
