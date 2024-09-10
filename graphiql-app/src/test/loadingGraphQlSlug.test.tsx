import { render, screen } from '@testing-library/react';
import Loading from '@/app/[locale]/graphql/[...slug]/loading';
import { vi } from 'vitest';

vi.mock('@/components/Loader/Loader', () => ({
  default: () => <div>Loading Spinner</div>,
}));

test('renders Loader component inside Loading', () => {
  render(<Loading />);

  const loader = screen.getByText('Loading Spinner');
  expect(loader).toBeInTheDocument();
});
