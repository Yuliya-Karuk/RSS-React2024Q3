import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Details } from '@components/Details/Details';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'src/store/store';
import { mockedReadyCharacter } from 'src/testSetup/msw/mocks';
import { renderWithRouter } from 'src/testSetup/render-router';

describe('CharacterItem rendering', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', () => {
    renderWithRouter(<CharacterItem character={mockedReadyCharacter} isDetailsOpen={false} />, {
      route: '/',
    });

    const characterName = screen.getByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const birthYear = screen.getByText('19BBY');
    expect(birthYear).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterItem character={mockedReadyCharacter} isDetailsOpen={false} />
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const spy = vi.spyOn(globalThis, 'fetch');

    const characterItem = await screen.findByTestId('item');
    expect(characterItem).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(characterItem);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://swapi.dev/api/people/1',
      })
    );

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component;', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterItem character={mockedReadyCharacter} isDetailsOpen={false} />
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const characterItem = await screen.findByTestId('item');
    expect(characterItem).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(characterItem);

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();
  });
});
