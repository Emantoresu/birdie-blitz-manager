import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Sidebar } from './Sidebar';
import { BrowserRouter } from 'react-router-dom';

// Mock the useMobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useMobile: () => ({ isMobile: false }),
}));

// NOTE: Removed mock for ui/sidebar as it was causing issues.
// The actual Sidebar component from the library will be rendered.

describe('AppSidebar', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Club Nights')).toBeInTheDocument();
    expect(screen.getByText('Court Booking')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument(); // This is from src/pages/Members.tsx, not the sidebar link
    expect(screen.getByText('Settings')).toBeInTheDocument();
    // Removed 'Support' as it's not in the sidebar
  });

  it('renders header and footer info', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText('BadmintonPro')).toBeInTheDocument();
    expect(screen.getByText('Club Management')).toBeInTheDocument();
    expect(screen.getByText('© 2024 BadmintonPro')).toBeInTheDocument();
    expect(screen.getByText('Version 1.0')).toBeInTheDocument();
  });
});
