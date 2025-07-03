import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

// Mock child components that might have their own complex logic or data fetching
vi.mock('@/components/StatsCard', () => ({
  StatsCard: ({ title }: { title: string }) => <div data-testid="stats-card">{title}</div>,
}));

// Removed Recharts mock as Dashboard.tsx does not use Recharts directly.

describe('Dashboard Page', () => {
  it('renders the main dashboard sections and stats cards', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // Check for StatsCards (mocked) - Adjusted to match actual titles from Dashboard.tsx
    expect(screen.getByText('Total Members')).toBeInTheDocument();
    expect(screen.getByText('Active Bookings')).toBeInTheDocument();
    expect(screen.getByText('Tournaments')).toBeInTheDocument();
    expect(screen.getByText('Court Utilization')).toBeInTheDocument();

    // Check for section titles
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('Recent Activities')).toBeInTheDocument();
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();

    // Removed checks for mocked chart components as they are not used directly by Dashboard.tsx
  });
});
