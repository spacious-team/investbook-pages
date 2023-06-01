import React, { FC } from 'react';
import { Banner } from '@investbook-pages/common-ui';
import { exampleProducts } from '@investbook-pages/products';
import { Container, List, ListItem, ListItemText } from '@mui/material';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => (
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

export default MainPage;
