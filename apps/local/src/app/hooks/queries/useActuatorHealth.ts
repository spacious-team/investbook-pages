import { getActuatorHealth } from '@investbook-pages/products';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

export function useActuatorHealth(
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['actuatorHealth'],
    queryFn: () => getActuatorHealth(),
    retry: false,
    staleTime: Infinity,
    ...options,
  });
}
