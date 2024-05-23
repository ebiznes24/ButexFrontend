import { Box, Container, Grid } from "@mui/material"
import { useParams } from "react-router-dom";
import { isExportDeclaration } from "typescript"
import { Product } from "../types/types";
import CardItemImage from "../components/item/CardItemImage";
import ItemInfoDetails from "../components/item/ItemInfoDetails";
import { useEffect, useState } from "react";
import { publicHook } from "../hooks/PublicHook";

const ItemPage = ({ }) => {

    const { id } = useParams();

    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const fetchProducts = async () => {
            publicHook.get(
                `/product/${id}`
            ).then(response => {
                setProduct(response.data);
            }).catch(error => {
                console.error('Error fetching products:', error);
                setProduct(undefined);
            });
        };

        fetchProducts();
    }, []);

    return (
        <Grid
            container
            sx={{
                minHeight: { xs: '100%', sm: '80dvh' },
                // minHeight:  '80dvh',
            }}
        >
            <Grid
                item
                md={8}
                sx={{
                    width: '100%',
                    flexDirection: 'column',
                    borderRight: { sm: 'none', md: '1px solid' },
                    borderColor: { sm: 'none', md: 'divider' },
                    alignItems: 'start',
                    pt: 4,
                    px: 4,
                    gap: 2,
                }}
            // maxHeight={80}
            >
                {
                    product && <CardItemImage product={product} />
                }

            </Grid>
            <Grid
                item
                md={4}

                sx={{
                    width: '100%',
                    flexDirection: 'column',
                    borderColor: { sm: 'none', md: 'divider' },
                    alignItems: 'start',
                    pt: 4,
                    px: 4,
                    gap: 2,
                }}
            >
                {
                    product && <ItemInfoDetails product={product} />
                }
            </Grid>

        </Grid>
    )
}

export default ItemPage
