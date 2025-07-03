import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './Layout';
import { BrowserRouter } from 'react-router-dom';

// Mock the useMobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useMobile: () => ({ isMobile: false }),
}));

describe('Layout', () => {
  it('renders correctly with children', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Child</div>
        </Layout>
      </BrowserRouter>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    // Check for sidebar elements
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Club Nights')).toBeInTheDocument();
  });
});
