import { Banner, Button } from '@investbook-pages/common-ui';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const DemoPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Banner text="Demo Page" />
      <p className="mb-4">
        This is a demo page to show that the router works correctly.
      </p>
      <div className="bg-secondary border border-blue-200 rounded p-4 mb-6">
        <p className="text-sm">
          You can navigate between different pages using the router
          configuration in app.tsx
        </p>
      </div>
      <Button onClick={() => navigate('/')}>Back to Main Page</Button>
    </div>
  );
};

export default DemoPage;
