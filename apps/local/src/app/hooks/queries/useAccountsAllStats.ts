import { getAccountsAllStats } from '@investbook-pages/products';
import { useQuery } from '@tanstack/react-query';

export function useAccountsAllStats() {
  return useQuery({
    queryKey: ['accountsAllStats'],
    queryFn: () => getAccountsAllStats(),
    staleTime: Infinity,
    meta: {
      showErrorToast: true,
      errorMessage: 'errors.fetch.accountsAllStats.fail',
    },
  });
}
