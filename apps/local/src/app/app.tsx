import { Banner } from '@investbook-pages/common-ui';
import { exampleProducts } from '@investbook-pages/products';

export function App() {
  return (
    <div>
      <Banner text="Hello world" />
      <ul>
        {exampleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> Price: {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
