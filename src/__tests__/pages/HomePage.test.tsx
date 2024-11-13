import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

describe('Homepage', () => {
  it('renders the homepage', () => {
    render(<HomePage />);

    // Assert that the title is rendered
    const titleElement = screen.getByText(/Find closest/i);
    expect(titleElement).toBeInTheDocument();

    // Assert that the subtitle is rendered
    const subtitleElement = screen.getByText(/Get the distance/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
