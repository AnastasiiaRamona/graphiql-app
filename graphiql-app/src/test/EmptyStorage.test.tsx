import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import EmptyStorage from '../components/EmptyStorage/EmptyStorage';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      historyMessage: 'Your history is empty',
    };
    return translations[key];
  }),
}));

vi.mock('../components/MenuButtons/MenuButtons', () => ({
  __esModule: true,
  default: (props: { isHistory: boolean }) => (
    <div>MenuButtons with isHistory={props.isHistory.toString()}</div>
  ),
}));

describe('EmptyStorage', () => {
  it('renders the icon and message correctly', () => {
    render(<EmptyStorage />);

    expect(screen.getByTestId('PolylineSharpIcon')).toBeInTheDocument();

    expect(screen.getByText('Your history is empty')).toBeInTheDocument();
  });

  it('renders MenuButtons with correct props', () => {
    render(<EmptyStorage />);

    expect(
      screen.getByText('MenuButtons with isHistory=true')
    ).toBeInTheDocument();
  });
});
