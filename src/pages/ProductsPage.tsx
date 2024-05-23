import { Container, Grid, Typography } from "@mui/material"
import { isExportDeclaration } from "typescript"
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/types";
import { publicHook } from "../hooks/PublicHook";

const ProductsPage = () => {

    const [products, setProducts] = useState<Product[]|undefined>([]);

    useEffect(() => {
        const fetchProducts = async () => {
          publicHook.get(
            '/product'
          ).then(response => {
            setProducts(response.data);
          }).catch(error => {
            console.error('Error fetching products:', error);
            setProducts(undefined);
          });
        };
    
        fetchProducts();
      }, []);

    return (
        <Container>
            <h1>Products Page</h1>
            <Grid container spacing={3}>
                {
                products !== undefined ? 
                products.map(shoe => (
                    <Grid item key={shoe.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={shoe} />
                    </Grid>
                )) :
                <Typography>
                    Problemy ze stroną
                </Typography>
            }
            </Grid>
        </Container>
    )
}

export default ProductsPage