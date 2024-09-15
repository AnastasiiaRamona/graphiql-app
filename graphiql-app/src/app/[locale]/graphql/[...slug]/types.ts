interface GraphQLPageParams {
  locale: string;
  slug: string[];
}

interface GraphQLPageProps {
  params: GraphQLPageParams;
  searchParams: Record<string, string>;
}
interface GraphQLPageClientProps extends GraphQLPageProps {
  url: string;
  bodyBase64: string;
}

export type { GraphQLPageParams, GraphQLPageProps, GraphQLPageClientProps };
