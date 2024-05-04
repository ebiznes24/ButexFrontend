import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ProductColor, ProductDTO } from "../../types/types";
import { useState } from "react";

const ItemInfoDetails: React.FC<{ product: ProductDTO }> = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState<number | ''>('');
    const [selectedColor, setSelectedColor] = useState<ProductColor | ''>('');

    const handleSizeChange = (event: SelectChangeEvent<number | ''>) => {
        setSelectedSize(event.target.value === '' ? '' : parseInt(event.target.value as string, 10));
    };

    const handleColorChange = (event: SelectChangeEvent<ProductColor | ''>) => {
        setSelectedColor(event.target.value as ProductColor | '');
    };

    const handleAddToBucket = () => {
        // Implement your logic for adding the product to the bucket here
        console.log("Product added to bucket:", product);
    };

    return (
        <Box height={'100%'}>
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price.toFixed(2)}</p>

            <FormControl fullWidth
            sx={{
                margin: '0.5rem 0rem',
            }}
            >
                <InputLabel id="size-label">Select Size</InputLabel>
                <Select
                    labelId="size-label"
                    id="size"
                    value={selectedSize}
                    onChange={handleSizeChange}
                >
                    <MenuItem value="">
                        <em>Select size</em>
                    </MenuItem>
                    {product.sizes.map((size) => (
                        <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth
            
            sx={{
                margin: '0.5rem 0rem',
            }}
            >
                <InputLabel id="color-label">Select Color</InputLabel>
                <Select
                    labelId="color-label"
                    id="color"
                    value={selectedColor}
                    onChange={handleColorChange}
                >
                    <MenuItem value="">
                        <em>Select color</em>
                    </MenuItem>
                    {product.colors.map((color) => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button sx={{ mt: 2, mb: 2 }} variant="contained" color="primary" onClick={handleAddToBucket}>
                Add to Bucket
            </Button>
        </Box>
    )
}

export default ItemInfoDetails;
