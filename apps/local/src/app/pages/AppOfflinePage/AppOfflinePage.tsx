import { WifiOff } from 'lucide-react';
import { Button } from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';

interface AppOfflinePageProps {
  onRetry: () => void;
}

export function AppOfflinePage({ onRetry }: AppOfflinePageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <WifiOff className="size-16 text-muted-foreground" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold">{t('offline.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('offline.body')}</p>
      </div>
      <Button onClick={onRetry}>{t('offline.retry')}</Button>
    </div>
  );
}
