// src/test/GraphQLPage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphQLPage from '../app/[locale]/graphql/[...slug]/page'; // Укажите правильный путь к вашему файлу
import GraphQLPageСlient from '../components/GraphQlClientPage/GraphQlClientPage';

vi.mock('@/components/GraphQlClientPage/GraphQlClientPage', () => ({
  __esModule: true,
  default: vi.fn(() => <div>GraphQLPageClient</div>),
}));

describe('GraphQLPage', () => {
  it('should render GraphQLPageClient with correct props', () => {
    const params = {
      locale: 'en',
      slug: [
        encodeURIComponent('http://example.com'),
        encodeURIComponent('eyJrZXkiOiAidmFsdWUifQ=='),
      ],
    };
    const searchParams = {};

    render(<GraphQLPage params={params} searchParams={searchParams} />);

    expect(screen.getByText('GraphQLPageClient')).toBeInTheDocument();

    expect(GraphQLPageСlient).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://example.com',
        bodyBase64: 'eyJrZXkiOiAidmFsdWUifQ==',
        params: {
          locale: 'en',
          slug: ['http%3A%2F%2Fexample.com', 'eyJrZXkiOiAidmFsdWUifQ%3D%3D'],
        },
        searchParams: {},
      }),
      expect.anything()
    );
  });
});
