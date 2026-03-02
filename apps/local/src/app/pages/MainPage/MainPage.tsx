import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '@investbook-pages/common-ui';
import { exampleProducts } from '@investbook-pages/products';

const MainPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Banner text="Investbook pages" />
      <ul className="mt-4 w-full divide-y divide-border">
        {exampleProducts.map((product) => (
          <li key={product.id} className="flex flex-col py-3">
            <span className="text-sm font-medium leading-none">
              {product.name}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              Price: {product.price}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/demo')}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go to Demo Page
      </button>
    </div>
  );
};

export default MainPage;
