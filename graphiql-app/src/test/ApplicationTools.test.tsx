import { render, screen } from '@testing-library/react';
import ApplicationTools from '../components/ApplicationTools/ApplicationTools';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      applicationToolsBlock1: 'Theme',
      applicationToolsBlock2: 'Integration',
      applicationToolsBlock3: 'Network',
      applicationToolsBlock4: 'History',
      applicationToolsBlock5: 'Public Data',
    };
    return translations[key];
  },
}));

describe('ApplicationTools', () => {
  it('renders the correct number of blocks with icons', () => {
    render(<ApplicationTools />);

    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Integration')).toBeInTheDocument();
    expect(screen.getByText('Network')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Public Data')).toBeInTheDocument();

    const icons = screen.getAllByTestId(/Icon$/);
    expect(icons).toHaveLength(5);
  });

  it('renders the hover effect correctly on the blocks', () => {
    render(<ApplicationTools />);

    const block = screen.getByText('Theme').closest('div');
    expect(block).toHaveStyle(
      'transition: transform 0.3s ease,box-shadow 0.3s ease'
    );
  });
});
