import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import NotFound from '../app/[locale]/not-found';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width || 'auto'}
      height={height || 'auto'}
    />
  ),
}));

const mockMessages = {
  notFound: 'Not Found',
  error: 'Error',
  pageNotFound: 'Page Not Found',
  goHome: 'Go Home',
};

vi.mock('next/navigation', () => ({
  useParams: () => ({
    locale: 'en',
  }),
}));

describe('NotFound', () => {
  it('renders correctly with all elements', () => {
    render(
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <NotFound />
      </NextIntlClientProvider>
    );

    expect(screen.getByAltText('Astronaut')).toBeInTheDocument();

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();

    const button = screen.getByText('Go Home');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/en/welcome');
  });

  it('cleans up intervals on unmount', () => {
    const { unmount } = render(
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <NotFound />
      </NextIntlClientProvider>
    );
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
