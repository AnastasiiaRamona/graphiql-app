import GraphQLPageСlient from '@/components/GraphQlClientPage/GraphQlClientPage';
import { GraphQLPageProps } from './types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphQL',
  description: 'GraphQL Playground',
  authors: [{ name: 'Oleksandr', url: 'https://github.com/aleks6699' }],
  keywords: ['GraphQL', 'Playground', 'API', 'QueryHub', 'Next.js'],
};

function GraphQLPage({ params, searchParams }: GraphQLPageProps) {
  const [url = '', bodyBase64 = ''] = params.slug.map((item: string) =>
    decodeURIComponent(item)
  );

  return (
    <GraphQLPageСlient
      params={params}
      searchParams={searchParams}
      url={url}
      bodyBase64={bodyBase64}
    />
  );
}

export default GraphQLPage;
