import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { ProblematicComponent } from './ProblematicComponent';

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

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary errorDescription={''} errorToast={''} refreshText={''}>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('logs error to console when an error occurs', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary errorDescription={''} errorToast={''} refreshText={''}>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
