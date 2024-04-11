import { Container, Grid } from "@mui/material"
import { isExportDeclaration } from "typescript"
import ProductCard from "../components/ProductCard";


// Define ProductType enum
enum ProductType {
    SHOES = "Shoes"
}

// Define ProductColor enum
enum ProductColor {
    RED = "Red",
    BLUE = "Blue",
    GREEN = "Green"
}

// Define interface for ProductDTO
interface ProductDTO {
    id: number;
    productType: ProductType;
    name: string;
    brand: string;
    price: number;
    sizes: number[];
    colors: ProductColor[];
    fabric: string;
}

const ProductsPage = () => {


    const shoes: ProductDTO[] = [
        {
            id: 1,
            productType: ProductType.SHOES,
            name: "Running Shoes",
            brand: "Brand A",
            price: 59.99,
            sizes: [8, 9, 10],
            colors: [ProductColor.RED, ProductColor.GREEN],
            fabric: "Mesh"
        },
        {
            id: 2,
            productType: ProductType.SHOES,
            name: "Walking Shoes",
            brand: "Brand B",
            price: 49.99,
            sizes: [7, 8, 9],
            colors: [ProductColor.BLUE, ProductColor.GREEN],
            fabric: "Leather"
        },
        {
            id: 3,
            productType: ProductType.SHOES,
            name: "Sports Shoes",
            brand: "Brand C",
            price: 69.99,
            sizes: [9, 10, 11],
            colors: [ProductColor.RED, ProductColor.BLUE],
            fabric: "Synthetic"
        },
        {
            id: 4,
            productType: ProductType.SHOES,
            name: "Casual Shoes",
            brand: "Brand D",
            price: 54.99,
            sizes: [8, 9, 10],
            colors: [ProductColor.GREEN],
            fabric: "Canvas"
        }
    ];

    return (
        <Container>
            <h1>Products Page</h1>
            <Grid container spacing={3}>
                {/* Render ProductCard for each shoe */}
                {shoes.map(shoe => (
                    <Grid item key={shoe.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={shoe} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ProductsPage
