import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsCard } from './StatsCard';
import { Users } from 'lucide-react';

describe('StatsCard', () => {
  it('renders correctly with given props', () => {
    render(
      <StatsCard
        title="Total Members"
        value="1,234"
        icon={Users}
        change="+12 this month"
        trend="up"
      />
    );
    expect(screen.getByText('Total Members')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+12 this month')).toBeInTheDocument();
  });

  it('renders correctly with different change text', () => {
    render(
      <StatsCard
        title="Cancelled Bookings"
        value="56"
        icon={Users}
        change="-3 this week"
        trend="down"
      />
    );
    expect(screen.getByText('Cancelled Bookings')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getByText('-3 this week')).toBeInTheDocument();
  });
});
