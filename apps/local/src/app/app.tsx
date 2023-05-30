import { Banner } from '@investbook-pages/common-ui';
import { exampleProducts } from '@investbook-pages/products';
import { Container, List, ListItem, ListItemText } from '@mui/material';

export function App() {
  return (
    <Container maxWidth="sm">
      <Banner text="Investbook pages" />
      <List sx={{ width: '100%' }}>
        {exampleProducts.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Price: ${product.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
