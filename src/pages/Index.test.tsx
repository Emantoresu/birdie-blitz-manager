import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IndexPage from './Index'; // Assuming Index.tsx exports default
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';

import { Dashboard } from './Dashboard'; // Import the actual Dashboard component

// Mock child components of Dashboard if necessary, similar to Dashboard.test.tsx
vi.mock('@/components/StatsCard', () => ({
  StatsCard: ({ title }: { title: string }) => <div data-testid="stats-card">{title}</div>,
}));
vi.mock('recharts', async () => {
  const originalModule = await vi.importActual('recharts');
  return {
    ...originalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
    BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    Line: () => <div data-testid="line" />,
    Bar: () => <div data-testid="bar" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
  };
});

describe('Index Page (Navigation Test)', () => {
  it('navigates to /dashboard and renders Dashboard content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          {/* Route to the actual Dashboard component */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for content from the actual Dashboard component
    expect(screen.getByText('Dashboard')).toBeInTheDocument(); // Changed from "Dashboard Overview"
    expect(screen.getByText('Total Members')).toBeInTheDocument(); // Example from StatsCard mock
  });
});
