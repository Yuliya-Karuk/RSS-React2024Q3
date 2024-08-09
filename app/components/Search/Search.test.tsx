import { Search } from '@components/Search/Search';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { createRemixStub } from '@remix-run/testing';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '@testSetup/render-router';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <Search />,
  },
]);

describe('Search', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const { getStorage } = useLocalStorage();

    const searchButton = screen.getByRole('button', { name: /search button/i });
    const input = screen.getByPlaceholderText<HTMLInputElement>('SEARCH ...');

    await userEvent.type(input, 'luke');
    await userEvent.click(searchButton);

    expect(input.value).toBe(getStorage());
  });

  it('the component retrieves the value from the local storage upon mounting.', () => {
    const mockSearch = 'Dart';
    const { setStorage } = useLocalStorage();
    setStorage(mockSearch);

    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const input = screen.getByPlaceholderText<HTMLInputElement>('SEARCH ...');
    expect(input.value).toBe(mockSearch);
  });
});
