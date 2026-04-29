import { useTranslation } from '@investbook-pages/products';
import { Spinner } from './spinner';

export function AppLoader() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/60 backdrop-blur-sm">
      <Spinner className="size-20" />
      <p className="text-base text-muted-foreground">{t('loading.appTitle')}</p>
    </div>
  );
}
