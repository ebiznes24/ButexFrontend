import { Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import { AdditionalPayment, AddressDetails, Backet } from "../../types/types";
import { useUserData } from "../../contex/UserDataContex";


const Review: React.FC<{addressDetails: AddressDetails}> = ({addressDetails}) => {

    const {userData} = useUserData();
    const productsPrice: number|undefined = userData?.shopingBasket.products.reduce((total, product) => total + product.price, 0);
    const totalPrice = productsPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const additionalPayments = userData?.additionalPayment.reduce((acc, item: AdditionalPayment) => acc + item.price, 0);
    const totalPriceAdditionalPayments = additionalPayments?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let allPayments = 0.00;
    if(productsPrice && additionalPayments){
        allPayments = productsPrice + additionalPayments;
    }
    const totalAllPayments = allPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Products" secondary={`${userData?.shopingBasket.products.length} selected`} />
                    <Typography variant="body2">${totalPrice}</Typography>
                </ListItem>
                {
                    userData?.additionalPayment.map(item => (
                        <React.Fragment>
                            <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
                                <ListItemText key={item.subName} primary={`${item.name}`} secondary={`${item.subName}`} />
                                <Typography variant="body2">${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                            </ListItem>
                        </React.Fragment>
                    ))
                }
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${totalAllPayments}
                    </Typography>
                </ListItem>
            </List>
            <Divider />
            <Stack
                direction="column"
                divider={<Divider flexItem />}
                spacing={2}
                sx={{ my: 2 }}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Shipment details
                    </Typography>
                    <Typography gutterBottom>{addressDetails.firstName} {addressDetails.lastName}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                    {addressDetails.houseNumber} {addressDetails.city}, {addressDetails.postalCode} {addressDetails.phoneNumber}
                    </Typography>
                </div>
            </Stack>
        </Stack>
    )
}

export default Review;