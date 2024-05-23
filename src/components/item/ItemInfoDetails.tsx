import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Product } from "../../types/types";
import { useState, useContext } from "react";

const ItemInfoDetails: React.FC<{ product: Product }> = ({ product }) => {

  const [selectedSize, setSelectedSize] = useState<number | ''>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleSizeChange = (event: SelectChangeEvent<number | ''>) => {
    setSelectedSize(event.target.value === '' ? '' : parseInt(event.target.value as string, 10));
};

const handleColorChange = (event: SelectChangeEvent<string | ''>) => {
    setSelectedColor(event.target.value as string | '');
};

  const handleAddToBucket = () => {
    if (selectedSize && selectedColor) {
      const bucketProduct = {
        ...product,
        selectedSize: selectedSize as number,
        selectedColor
      };
      console.log('succesfully added to bucket <3');
    } else {
      alert('Please select both size and color.');
    }
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