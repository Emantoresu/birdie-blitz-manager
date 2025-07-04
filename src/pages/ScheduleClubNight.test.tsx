import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ScheduleClubNight } from './ScheduleClubNight';
import { BrowserRouter } from 'react-router-dom'; // Or MemoryRouter

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock window.alert
global.alert = vi.fn();

describe('ScheduleClubNight Page', () => {
  it('renders the form with all fields and buttons', () => {
    render(
      <BrowserRouter> {/* Use BrowserRouter or MemoryRouter if needed for Link/navigate */}
        <ScheduleClubNight />
      </BrowserRouter>
    );

    // Check for header
    expect(screen.getByText('Schedule New Club Night')).toBeInTheDocument();

    // Check for form labels/inputs
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., Friday Night Social')).toBeInTheDocument();

    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();

    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., Main Hall - Courts 1 & 2')).toBeInTheDocument();

    expect(screen.getByLabelText('Max Participants')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., 20')).toBeInTheDocument();

    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Provide a brief description of the club night...')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole('button', { name: 'Schedule Club Night' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls navigate when cancel button is clicked', () => {
    render(
      <BrowserRouter>
        <ScheduleClubNight />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockedNavigate).toHaveBeenCalledWith('/club-nights');
  });

  it('simulates form submission and calls alert and navigate', () => {
    render(
      <BrowserRouter>
        <ScheduleClubNight />
      </BrowserRouter>
    );
    // Fill in some required fields (optional for this basic test, but good practice)
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Night' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-01-01' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Test Location' } });
    fireEvent.change(screen.getByLabelText('Max Participants'), { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: 'Schedule Club Night' }));

    expect(global.alert).toHaveBeenCalledWith('Club Night Scheduled (Simulated)!');
    expect(mockedNavigate).toHaveBeenCalledWith('/club-nights');
  });
});
