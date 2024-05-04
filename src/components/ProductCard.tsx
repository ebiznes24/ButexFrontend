import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ProductDTO, ProductColor } from './../types/types'; // Import ProductDTO and ProductColor from your types file
import shoes from './../assets/but.png';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: ProductDTO;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
      onClick={() => {
        navigate(`/butex/item/${product.id}`);
      }}
      >
        <CardMedia
          component="img"
          height="140"
          image={shoes}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brand: {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sizes: {product.sizes.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Colors: {product.colors.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fabric: {product.fabric}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
