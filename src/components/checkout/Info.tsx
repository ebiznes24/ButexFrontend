import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Product } from "../../types/types";


const Info: React.FC<{totalPrice: string, products: Product[]}> = ({totalPrice, products}) => {

    return (
        <React.Fragment>
            <Typography variant="subtitle2" color="text.secondary">
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                {totalPrice}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product.name}
                            secondary={product.brand}
                        />
                        <Typography variant="body1" fontWeight="medium">
                            {product.price}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    )
}

export default Info;