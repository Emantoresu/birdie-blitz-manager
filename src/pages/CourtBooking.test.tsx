import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CourtBooking } from './CourtBooking'; // Adjusted import to named export
import { BrowserRouter } from 'react-router-dom';

describe('CourtBooking Page', () => {
  it('renders the court booking header and schedule grid', () => {
    render(
      <BrowserRouter>
        <CourtBooking />
      </BrowserRouter>
    );

    // Check for header elements
    expect(screen.getByText('Court Booking')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New Booking' })).toBeInTheDocument();
    expect(screen.getByLabelText('Select Date:')).toBeInTheDocument();

    // Check for schedule elements
    expect(screen.getByText('Court Schedule')).toBeInTheDocument();
    expect(screen.getByText('Court 1')).toBeInTheDocument(); // Example court
    expect(screen.getByText('06:00')).toBeInTheDocument(); // Example time slot

    // Check for summary elements
    expect(screen.getByText("Today's Bookings Summary")).toBeInTheDocument();
    expect(screen.getByText('Confirmed Bookings')).toBeInTheDocument();
  });
});
