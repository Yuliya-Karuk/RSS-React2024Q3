import { Search } from '@components/Search/Search';
import { useLocalStorage } from '@hooks/useSearchQuery';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('SearchF', () => {
  test('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Search />
      </MemoryRouter>
    );

    const { getStorage } = useLocalStorage();

    const searchButton = screen.getByRole('button', { name: /search button/i });
    const input = screen.getByPlaceholderText<HTMLInputElement>('SEARCH ...');

    await userEvent.type(input, 'luke');
    await userEvent.click(searchButton);

    expect(input.value).toBe(getStorage());
  });

  test('the component retrieves the value from the local storage upon mounting.', () => {
    const mockSearch = 'Dart';
    const { setStorage } = useLocalStorage();
    setStorage(mockSearch);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('SEARCH ...');
    expect(input.value).toBe(mockSearch);
  });
});
