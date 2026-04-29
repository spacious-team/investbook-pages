import { getAccountsAllStats } from '@investbook-pages/products';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

export function useAccountsAllStats(
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['accountsAllStats'],
    queryFn: () => getAccountsAllStats(),
    staleTime: Infinity,
    meta: {
      showErrorToast: true,
      errorMessage: 'errors.fetch.accountsAllStats.fail',
    },
    ...options,
  });
}
