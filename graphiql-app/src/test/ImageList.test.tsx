import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuiltedImageList from '@/components/ImageList/ImageList';
import itemData from '@/data/data';
import Image from 'next/image';

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

describe('QuiltedImageList', () => {
  it('renders ImageList component', () => {
    render(<QuiltedImageList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders ImageListItem components for each item', () => {
    render(<QuiltedImageList />);
    const imageListItems = screen.getAllByRole('listitem');
    expect(imageListItems).toHaveLength(itemData.length);
  });

  it('renders ImageList component', () => {
    render(<QuiltedImageList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
