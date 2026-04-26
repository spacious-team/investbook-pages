import { getAccountsAllStats } from '@investbook-pages/products';
import { useQuery } from '@tanstack/react-query';

export function useAccountsAllStats() {
  return useQuery({
    queryKey: ['accountsAllStats'],
    queryFn: () => getAccountsAllStats({ throwOnError: true }),
    staleTime: Infinity,
  });
}
