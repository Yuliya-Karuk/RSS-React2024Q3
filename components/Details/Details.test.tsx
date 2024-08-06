import { Details } from '@components/Details/Details';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@testSetup/render-router';

const closeDetailsMock = vi.fn();

vi.mock('@hooks/useHandleDetails', () => ({
  useHandleDetails: () => ({
    closeDetails: closeDetailsMock,
    openDetails: vi.fn(),
  }),
}));

describe('Details Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('Make sure the detailed card component correctly displays the detailed card data;', async () => {
    renderWithProviders(
      await (async () => {
        const jsx = await Details({ id: '1' });
        return jsx;
      })()
    );

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();

    const birthYear = await screen.findByText('19BBY');
    expect(birthYear).toBeInTheDocument();

    const weight = await screen.findByText('172');
    expect(weight).toBeInTheDocument();

    const height = await screen.findByText('77');
    expect(height).toBeInTheDocument();

    const planet = await screen.findByText('Tatooine Mocked');
    expect(planet).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component.', async () => {
    renderWithProviders(
      await (async () => {
        const jsx = await Details({ id: '1' });
        return jsx;
      })()
    );

    const user = userEvent.setup();

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();

    const closeButton = await screen.findByLabelText('Close details');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(closeDetailsMock).toHaveBeenCalled();
  });
});
