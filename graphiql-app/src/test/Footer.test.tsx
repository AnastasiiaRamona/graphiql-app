import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('renders the RSS logo with correct link', () => {
    render(<Footer />);

    const rssButton = screen.getByRole('link', { name: /rss logo/i });
    expect(rssButton).toHaveAttribute('href', 'https://rs.school/');

    const rssImage = screen.getByAltText('RSS logo');
    expect(rssImage).toBeInTheDocument();
    expect(rssImage).toHaveAttribute('src', expect.stringContaining('RSS.svg'));
  });

  it('renders the year correctly', () => {
    render(<Footer />);

    const yearText = screen.getByText('2024');
    expect(yearText).toBeInTheDocument();
  });
});
