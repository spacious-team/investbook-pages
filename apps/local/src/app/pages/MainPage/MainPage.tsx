import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner, Button } from '@investbook-pages/common-ui';
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
      <Button onClick={() => navigate('/demo')}>Go to Demo Page</Button>
    </div>
  );
};

export default MainPage;
