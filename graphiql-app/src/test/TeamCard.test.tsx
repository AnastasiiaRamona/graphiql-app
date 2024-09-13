import { render, screen } from '@testing-library/react';
import TeamCard from '../components/AboutTeam/TeamCard/TeamCard';
import '@testing-library/jest-dom';
import martiImgSrc from '../assets/images/Marti.webp';

const mockMembers = [
  {
    name: 'Анастасия',
    img: martiImgSrc,
    email: 'anastasiarchm@gmail.com',
    location: 'Швеция',
    description: 'Front-end разработчик',
    github: 'https://github.com/AnastasiiaRamona/',
  },
  {
    name: 'Алекс',
    img: martiImgSrc,
    email: 'aleks6699@gmail.com',
    location: 'Голландия',
    description: 'Front-end разработчик',
    github: 'https://github.com/aleks6699/',
  },
  {
    name: 'Марти',
    img: martiImgSrc,
    email: 'marti.iden.cod@gmail.com',
    location: 'Испания',
    description: 'Front-end разработчик',
    github: 'https://github.com/MartiP54/',
  },
];

describe('TeamCard', () => {
  it('renders the correct number of member cards', () => {
    render(<TeamCard members={mockMembers} />);

    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(3);
  });

  it('renders member details correctly', () => {
    render(<TeamCard members={mockMembers} />);

    expect(screen.getByText('Анастасия')).toBeInTheDocument();
    expect(screen.getByText('Алекс')).toBeInTheDocument();
    expect(screen.getByText('Марти')).toBeInTheDocument();

    expect(screen.getAllByText('Front-end разработчик')).toHaveLength(3);

    expect(
      screen.getByText('anastasiarchm@gmail.com').closest('a')
    ).toHaveAttribute('href', 'mailto:anastasiarchm@gmail.com');
    expect(
      screen.getByText('aleks6699@gmail.com').closest('a')
    ).toHaveAttribute('href', 'mailto:aleks6699@gmail.com');
    expect(
      screen.getByText('marti.iden.cod@gmail.com').closest('a')
    ).toHaveAttribute('href', 'mailto:marti.iden.cod@gmail.com');
  });

  it('renders GitHub links correctly', () => {
    render(<TeamCard members={mockMembers} />);

    const githubLinks = screen.getAllByText('GitHub');
    expect(githubLinks).toHaveLength(3);

    expect(githubLinks[0].closest('a')).toHaveAttribute(
      'href',
      'https://github.com/AnastasiiaRamona/'
    );
    expect(githubLinks[1].closest('a')).toHaveAttribute(
      'href',
      'https://github.com/aleks6699/'
    );
    expect(githubLinks[2].closest('a')).toHaveAttribute(
      'href',
      'https://github.com/MartiP54/'
    );
  });
});
