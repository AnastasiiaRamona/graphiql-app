import { GraphQLPageProps } from './types';
import GraphQLPageСlient from '@/components/pageGraphQlClient/pageGraphQlClient';

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
