import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GraphQLPage from '../app/[locale]/graphql/page';
import '@testing-library/jest-dom';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ uid: '123', email: 'test@example.com' });
    return () => {};
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const MockIntlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

describe('GraphQLPage Component', () => {
  it('renders the GraphQLPage component correctly', () => {
    render(
      <MockIntlProvider>
        <GraphQLPage />
      </MockIntlProvider>
    );

    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.getByText('graphqlYourFirstRequest')).toBeInTheDocument();

    const button = screen.getByRole('link', { name: /getStarted/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      'graphql/aHR0cHM6Ly9ncmFwaHFsemVyby5hbG1hbnNpLm1lL2FwaQ==/cXVlcnkgQWxidW0oJGlkOiBJRCEpIHsKICBhbGJ1bShpZDogJGlkKSB7CiAgICBpZAogICAgdGl0bGUKICB9Cn0K%7CewogICJpZCI6ICIxIgp9'
    );
  });
});
