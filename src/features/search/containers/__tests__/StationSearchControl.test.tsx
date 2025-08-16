import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, test, expect, beforeEach } from 'vitest';

// Mock the stations hook — IMPORTANT: path must match how your component imports it
vi.mock('@/features/map/hooks/useStation', () => ({
  useStationsAndForecasts: () => ({
    stations: [{ id: '1', name: 'Ang Mo Kio', lat: 1.369, lng: 103.849 }],
    forecasts: [],
    loading: false,
  }),
}));

const flyTo = vi.fn();
vi.mock('../../lib/reactLeafletAdapter', () => ({
  useMap: () => ({ flyTo }),
}));

import { StationSearchControl } from '../StationSearchControl';

beforeEach(() => flyTo.mockClear());

test('pans to station on Enter', async () => {
  const user = userEvent.setup();
  render(<StationSearchControl />);

  await user.type(screen.getByPlaceholderText(/search station/i), 'ang{Enter}');
  expect(flyTo).toHaveBeenCalledWith([1.369, 103.849], 14, { animate: true });
});
