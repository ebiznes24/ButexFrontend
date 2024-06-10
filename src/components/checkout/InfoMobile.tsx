import { Box, Button, Drawer, IconButton } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useState } from "react";
import Info from "./Info";
import { Product } from "../../types/types";
import { useUserData } from "../../contex/UserDataContex";



const InfoMobile: React.FC = () => {

    const [open, setOpen] = useState(false);
    const {userData} = useUserData();
    const productsPrice: number|undefined = userData?.shopingBasket.products.reduce((total, product) => total + product.price, 0);
    const totalPrice = productsPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
            <IconButton
                onClick={toggleDrawer(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <Info/>
        </Box>
    );

    return (
        <div>
            <Button
                variant="text"
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={toggleDrawer(true)}
            >
                View details
            </Button>
            <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default InfoMobile;