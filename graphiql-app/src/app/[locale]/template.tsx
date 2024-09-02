import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}
