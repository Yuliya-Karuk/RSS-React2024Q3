import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import Details from '@components/Details/Details';
import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockedCharacterWithFavorite, mockedDetails, mockedFilms, mockedPlanet } from '@testSetup/msw/mocks';
import { renderWithProviders } from '@testSetup/render-router';

describe('CharacterItem rendering', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <CharacterItem character={mockedCharacterWithFavorite} isDetailsOpen={false} />,
      },
    ]);

    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const characterName = screen.getByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const birthYear = screen.getByText('19BBY');
    expect(birthYear).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component;', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <>
            <CharacterItem character={mockedCharacterWithFavorite} isDetailsOpen={false} />
            <Details films={mockedFilms.results} planet={mockedPlanet} detailsCharacter={mockedDetails} />
          </>
        ),
      },
    ]);

    renderWithProviders(<RemixStub initialEntries={['/']} />);

    const characterItem = await screen.findByTestId('item');
    expect(characterItem).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(characterItem);

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();
  });
});
