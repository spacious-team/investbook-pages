import { Banner } from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';
import { FC } from 'react';

const AnalyticsPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Banner text={t('pageTitles.analytics')} />
    </div>
  );
};

export default AnalyticsPage;
