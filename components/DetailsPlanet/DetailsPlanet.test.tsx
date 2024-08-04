import { mockedPlanet } from '@testSetup/msw/mocks';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailsPlanet } from './DetailsPlanet';

describe('DetailsPlanet', () => {
  it('sets default image on error', () => {
    render(<DetailsPlanet planet={mockedPlanet} />);

    const imgElement = screen.getByAltText('Character') as HTMLImageElement;

    expect(imgElement.src).toContain('https://starwars-visualguide.com/assets/img/planets/1.jpg');

    fireEvent.error(imgElement);

    expect(imgElement.src).toContain('/images/default-planet.jpg');
  });
});
