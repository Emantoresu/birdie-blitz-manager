import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ClubNightsHeader } from './ClubNightsHeader';
import { BrowserRouter } from 'react-router-dom';

describe('ClubNightsHeader', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <ClubNightsHeader />
      </BrowserRouter>
    );
    expect(screen.getByText('Club Nights')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Schedule Club Night' })).toBeInTheDocument();
  });
});
