'use client';

import ErrorPage from '@/components/ErrorPage/ErrorPage';
import ErrorProps from '@/types/types';

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorPage error={error} reset={reset} />;
}
