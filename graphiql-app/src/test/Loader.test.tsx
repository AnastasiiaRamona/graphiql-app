import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader/Loader';

describe('Loader component', () => {
  it('renders CircularProgress', () => {
    render(<Loader />);
    const loader = screen.getByRole('progressbar');
    expect(loader).toBeInTheDocument();
  });
});
