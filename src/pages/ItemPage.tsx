import { Box, Container, Grid } from "@mui/material"
import { useParams } from "react-router-dom";
import { isExportDeclaration } from "typescript"
import { Product, ProductColor, ProductDTO, ProductType } from "../types/types";
import CardItemImage from "../components/item/CardItemImage";
import ItemInfoDetails from "../components/item/ItemInfoDetails";

const ItemPage = ({}) => {

    const { id } = useParams();

    console.log(id);

    const product: ProductDTO = {
        id: 1,
        productType: ProductType.SHOES,
        name: 'Classic Leather Sneakers',
        brand: 'XYZ Footwear',
        price: 99.99,
        sizes: [7, 8, 9, 10, 11],
        colors: [ProductColor.BLUE, ProductColor.GREEN],
        fabric: 'Leather',
    }

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
                <CardItemImage
                    product={product}
                />
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
                <ItemInfoDetails product={product} />
            </Grid>

        </Grid>
    )
}

export default ItemPage
