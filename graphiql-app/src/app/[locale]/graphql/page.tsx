import WelcomeGraphQLPage from '@/components/WelcomeGraphQLPage/WelcomeGraphQLPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphQL',
  description: 'Jump page for first request using GraphQL',
  authors: [{ name: 'Oleksandr', url: 'https://github.com/aleks6699' }],
  keywords: ['GraphQL', 'Playground', 'API', 'QueryHub', 'Next.js'],
};

export default function GraphQLPage() {
  return <WelcomeGraphQLPage />;
}
