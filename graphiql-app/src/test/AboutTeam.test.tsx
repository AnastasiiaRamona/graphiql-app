import { render, screen } from '@testing-library/react';
import AboutTeamBox from '../components/AboutTeam/AboutTeam';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      aboutTeam: 'О команде',
      nameAnastasiia: 'Анастасия',
      locationAnastasiia: 'Великобритания',
      frontendDescription: 'Front-end разработчик',
      nameAleks: 'Алекс',
      locationAleks: 'Италия',
      nameMarti: 'Марти',
      locationMarti: 'Германия',
    };
    return translations[key];
  },
}));

describe('AboutTeamBox', () => {
  it('renders correctly', () => {
    render(<AboutTeamBox />);

    expect(screen.getByText('О команде')).toBeInTheDocument();

    expect(screen.getByText('Анастасия')).toBeInTheDocument();
    expect(screen.getByText('Алекс')).toBeInTheDocument();
    expect(screen.getByText('Марти')).toBeInTheDocument();

    expect(screen.getAllByText('Front-end разработчик').length).toBe(3);

    const icon = screen.getByTestId('Groups3SharpIcon');
    expect(icon).toBeInTheDocument();
  });
});
