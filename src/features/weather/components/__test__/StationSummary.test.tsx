import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StationSummary } from '../StationSummary';

describe('StationSummary', () => {
  test('shows forecast when provided', () => {
    render(<StationSummary stationName="Ang Mo Kio" forecastText="Showers" />);
    expect(screen.getByText("Tomorrow's Forecast")).toBeInTheDocument();
    expect(screen.getByText('Showers')).toBeInTheDocument();
  });

  test('shows fallback when forecast missing', () => {
    render(<StationSummary stationName="Bedok" />);
    expect(screen.getByText('No forecast text.')).toBeInTheDocument();
  });
});
