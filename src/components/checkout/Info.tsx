import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Product } from "../../types/types";
import { useUserData } from "../../contex/UserDataContex";


const Info: React.FC = () => {

    const { userData } = useUserData();
    const productsPrice: number | undefined = userData?.shopingBasket.products.reduce((total, product) => total + product.price, 0);
    const totalPrice = productsPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <React.Fragment>
            <Typography variant="subtitle2" color="text.secondary">
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                {totalPrice}
            </Typography>
            <List disablePadding>
                {
                    userData?.shopingBasket.products.map((product, index) => (
                        <ListItem key={index} sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                sx={{ mr: 2 }}
                                primary={product.name}
                                secondary={product.brand}
                            />
                            <Typography variant="body1" fontWeight="medium">
                                {product.price}
                            </Typography>
                        </ListItem>
                    ))
                }
            </List>
        </React.Fragment>
    )
}

export default Info;