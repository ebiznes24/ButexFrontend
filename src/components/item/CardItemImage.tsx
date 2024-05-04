import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import shoe from './../../assets/but.png'
import { ProductDTO } from "../../types/types"

const CardItemImage: React.FC<{product: ProductDTO}> = ({product}) => {


    return (
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                sx={{
                    width: '100%',
                    maxWidth: '30rem',
                    margin: 'auto',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    // width: '100%', // Adjusted width for responsiveness
                    // height: 'auto', // Maintain aspect ratio
                    // maxHeight: '200',

                    display: 'flex', // Make sure it's a block element
                    // mx: 'auto', // Center horizontally
                    // mb: 1, // Add some bottom margin for spacing
                }}
                image={shoe}
                alt={'Label'}
            />
            <CardContent>
                <CardContent>
                    <Typography variant="subtitle1" color="text.secondary">
                        Shoes: {product.name}
                    </Typography>
                </CardContent>
            </CardContent>

        </Card>
    )
}

export default CardItemImage