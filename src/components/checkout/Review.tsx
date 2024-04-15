import { Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import { AdditionalPayment, AddressDetails, Backet, Product, ProductDTO } from "../../types/types";


const Review: React.FC<{ backet: Backet, addressDetails: AddressDetails }> = ({ backet, addressDetails }) => {

    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Products" secondary={`${backet.products.length} selected`} />
                    <Typography variant="body2">${backet.productsPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                </ListItem>
                {
                    backet.additionalPayments.map(item => (
                        <React.Fragment>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={`${item.name}`} secondary={`${item.subName}`} />
                                <Typography variant="body2">${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                            </ListItem>
                        </React.Fragment>
                    ))
                }
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${(backet.productsPrice + backet.additionalPayments.reduce((acc, item: AdditionalPayment) => acc + item.price, 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                    {addressDetails.houseNumber} {addressDetails.city}, {addressDetails.postalCodeCity} {addressDetails.postalCode}
                    </Typography>
                </div>
                {/* <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        {payment.name}
                                    </Typography>
                                    <Typography variant="body2">{payment.detail}</Typography>
                                </Stack>
                            </React.Fragment>
                        ))}
                    </Grid>
                </div> */}
            </Stack>
        </Stack>
    )
}

export default Review;