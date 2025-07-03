import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ClubNightCard } from './ClubNightCard';

const mockNight = {
  id: 1,
  title: 'Test Club Night',
  date: '2024-12-31',
  time: '18:00',
  duration: '2 hours',
  location: 'Test Location',
  maxParticipants: 20,
  currentParticipants: 10,
  description: 'This is a test club night.',
  status: 'Upcoming' as const,
  organizer: 'Test Organizer',
};

describe('ClubNightCard', () => {
  it('renders club night information correctly', () => {
    render(<ClubNightCard night={mockNight} />);

    expect(screen.getByText(mockNight.title)).toBeInTheDocument();
    expect(screen.getByText(mockNight.status)).toBeInTheDocument();
    expect(screen.getByText(new Date(mockNight.date).toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(`${mockNight.time} (${mockNight.duration})`)).toBeInTheDocument();
    expect(screen.getByText(mockNight.location)).toBeInTheDocument();
    expect(screen.getByText(`${mockNight.currentParticipants}/${mockNight.maxParticipants} participants`)).toBeInTheDocument();
    expect(screen.getByText(mockNight.description)).toBeInTheDocument();
    expect(screen.getByText(mockNight.organizer)).toBeInTheDocument();
  });
});
