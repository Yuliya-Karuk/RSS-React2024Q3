import { Details } from '@components/Details/Details';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, it } from 'vitest';
import Home from './home';

const searchParams = { page: '1', query: '', details: '' };

vi.mock('@hooks/useHandleFlyout', () => ({
  useHandleFlyout: vi.fn(() => ({
    downloadUrl: 'http://example.com/1_characters.csv',
    handleRemoveAll: vi.fn(),
  })),
}));

describe('Home Component', () => {
  it('should render CharacterList, Pagination, and Favorites components correctly', async () => {
    const home = await (async () => Home({ searchParams }))();
    const details = await (async () => Details({ id: '1' }))();

    renderWithProviders(
      <>
        {home}
        {details}
      </>
    );

    const characterName = await screen.findByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const detailsName = await screen.findByText('Luke Skywalker Details');
    expect(detailsName).toBeInTheDocument();

    const planet = await screen.findByText('Tatooine Mocked');
    expect(planet).toBeInTheDocument();
  });
});
