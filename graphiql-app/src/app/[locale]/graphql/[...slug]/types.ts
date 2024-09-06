interface GraphQLPageParams {
  locale: string;
  slug: string[];
}

interface GraphQLPageProps {
  params: GraphQLPageParams;
  searchParams: Record<string, string>;
}

export type { GraphQLPageParams, GraphQLPageProps };
