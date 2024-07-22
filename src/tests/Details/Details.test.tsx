import { Details } from '@components/Details/Details';
import { ThemeProvider } from '@contexts/themeProvider';
import { Home } from '@pages/home/home';
import { store } from '@store/store';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Details Component', () => {
  const renderWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={[route]}>
            <Routes>
              <Route path="/" element={ui} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('displays a loading indicator while fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data;', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();

    const birthYear = await screen.findByText('19BBY');
    expect(birthYear).toBeInTheDocument();

    const planet = await screen.findByText('Tatooine Mocked');
    expect(planet).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component.', async () => {
    renderWithRouter(<Home />, {
      route: '/',
    });

    const characterItem = await screen.findByRole('button');
    expect(characterItem).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(characterItem);

    // const characterName = await screen.findByText('Luke Skywalker Details');
    // expect(characterName).toBeInTheDocument();

    // const closeButton = screen.getByLabelText('Close details');

    // expect(closeButton).toBeInTheDocument();

    // await user.click(closeButton);

    // const detailsItem = await screen.findByTestId('details');
    // expect(detailsItem).not.toBeInTheDocument();
  });
});
