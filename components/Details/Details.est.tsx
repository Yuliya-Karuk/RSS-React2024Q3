import { Details } from '@components/Details/Details';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@testSetup/render-router';

const closeDetailsMock = vi.fn();
vi.mock('next/router', () => vi.importActual('next-router-mock'));

// vi.mock('@hooks/useHandleDetails', () => ({
//   useHandleDetails: () => ({
//     closeDetails: closeDetailsMock,
//     openDetails: vi.fn(),
//   }),
// }));

describe('Details Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it.only('Make sure the detailed card component correctly displays the detailed card data;', async () => {
    renderWithProviders(<Details />);

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();

    const birthYear = await screen.findByText('19BBY');
    expect(birthYear).toBeInTheDocument();

    const planet = await screen.findByText('Tatooine Mocked');
    expect(planet).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component.', async () => {
    renderWithProviders(<Details />);

    const user = userEvent.setup();

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();

    const closeButton = await screen.findByLabelText('Close details');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(closeDetailsMock).toHaveBeenCalled();
  });
});
