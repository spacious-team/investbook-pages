import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import i18n from 'i18next';
import { toast } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      showErrorToast?: boolean;
      errorMessage?: string;
    };
    mutationMeta: {
      suppressErrorToast?: boolean;
      suppressSuccessToast?: boolean;
      errorMessage?: string;
      successMessage?: string;
      operationType?: 'create' | 'update' | 'delete';
    };
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_error, query) => {
      if (!query.meta?.showErrorToast) {
        return;
      }

      const key = query.meta.errorMessage ?? 'errors.fetch.fail';

      toast.error(i18n.t(key));
    },
  }),
  mutationCache: new MutationCache({
    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.suppressErrorToast) {
        return;
      }

      const type = mutation.meta?.operationType ?? 'create';
      const key = mutation.meta?.errorMessage ?? `errors.${type}.fail`;

      toast.error(i18n.t(key));
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.suppressSuccessToast) {
        return;
      }

      const type = mutation.meta?.operationType ?? 'create';
      const key = mutation.meta?.successMessage ?? `errors.${type}.success`;

      toast.success(i18n.t(key));
    },
  }),
});
