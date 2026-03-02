import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const DemoPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Demo Page</h2>
      <p className="text-gray-600 mb-4">
        This is a demo page to show that the router works correctly.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <p className="text-sm">
          You can navigate between different pages using the router configuration in app.tsx
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Back to Main Page
      </button>
    </div>
  );
};

export default DemoPage;
