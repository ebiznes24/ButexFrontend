import { Fragment, useState } from "react";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
import Review from "../components/checkout/Review";
import { Box, Button, Card, CardContent, Grid, InputBase, OutlinedInput, Stack, Step, StepLabel, Stepper, ThemeProvider, Typography, createMuiTheme, createTheme } from "@mui/material";

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Info from "../components/checkout/Info";
import InfoMobile from "../components/checkout/InfoMobile";
import { AdditionalPayment, AddressDetails, ShopingBusketProduct } from "../types/types";
import { useUserData } from "../contex/UserDataContex";
import { publicHook } from "../hooks/PublicHook";
import { useNotification } from "../contex/notificationContex";

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    padding: '8px 10px', // Adjust padding here
                }
            }
        }
    }
});


const CheckoutPage: React.FC<{}> = ({ }) => {
    const { userData, clearBasket, getAllProducts } = useUserData();

    const productsPrice: number | undefined = userData?.shopingBasket.products.reduce((total, product) => total + product.price, 0);
    const totalPrice = productsPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const additionalPayments = userData?.additionalPayment.reduce((acc, item: AdditionalPayment) => acc + item.price, 0);
    const totalPriceAdditionalPayments = additionalPayments?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let allPayments = 0.00;
    if (productsPrice && additionalPayments) {
        allPayments = productsPrice + additionalPayments;
    }
    const totalAllPayments = allPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const [addressDetails, setAddressDetails] = useState<AddressDetails>({
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'wojtek34566@gmail.com',
        city: 'Zgierz',
        houseNumber: '6',
        street: 'Przykładowa ',
        postalCode: '98-100',
        phoneNumber: '537855316',
        service: 'INPOST',
    });

    const [errorFrom, setErrorFrom] = useState<AddressDetails>({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        houseNumber: '',
        street: '',
        postalCode: '',
        phoneNumber: '',
        service: '',
    });
    const validateAddressForm = () => {
        const { firstName, lastName, email, city, houseNumber, street, postalCode, phoneNumber, service } = addressDetails;
        console.log(addressDetails)
        setErrorFrom({
            firstName: !firstName ? 'First name is required' : '',
            lastName: !lastName ? 'Last name is required' : '',
            email: !email ? 'Email is required' : '',
            city: !city ? 'City is required' : '',
            houseNumber: !houseNumber ? 'House number is required' : '',
            street: !street ? 'Street is required' : '',
            postalCode: !postalCode ? 'Postal code is required' : '',
            phoneNumber: !phoneNumber ? 'State is required' : '',
            service: !service ? 'Service is required' : '',
        });
        if (firstName === '' || lastName === '' || email === '' || city === '' || street === '' || houseNumber === '' || postalCode === '' || phoneNumber === '' || service === '') {
            return false;
        }
        return Object.values(errorFrom).every(error => error === '');
    };

    let OrderID: number | undefined = undefined;
    const [orderId, setOrderId] = useState<number | undefined>(undefined);
    const [paymentID, setPaymentID] = useState<string>('');
    const { showNotification } = useNotification();

    interface Steps {
        name: string;
        buttonName: string;
        onSubmit: () => boolean;
        elementToDisplay: JSX.Element;
    }
    const steps_1: Steps[] = [
        {
            name: "Shipping address",
            buttonName: "Next",
            onSubmit: function (): boolean {
                const formIsValid = validateAddressForm();
                if (!formIsValid) {
                    return false;
                }
                handleNext();
                return true;
            },
            elementToDisplay: <AddressForm addressDetails={addressDetails} setAddressDetails={setAddressDetails} errorForm={errorFrom} />,
        },
        {
            name: "Review your order",
            buttonName: "Next",
            onSubmit: function (): boolean {
                //wysłanie zapytania jeśli tak to 
                const products: { productId: number, quantity: number }[] = [];
                getAllProducts().map((product: ShopingBusketProduct) => {
                    // Find the product in the data array
                    const existingProduct = products.find(p => p.productId === product.id);

                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        products.push({
                            productId: product.id,
                            quantity: 1,
                        });
                    }
                });
                const orderDTO = {
                    "products": products,
                    "name": addressDetails.firstName + " " + addressDetails.lastName,
                    "street": addressDetails.street + " " + addressDetails.houseNumber,
                    "postcode": addressDetails.postalCode,
                    "city": addressDetails.city,
                    "email": addressDetails.email,
                    "phoneNumber": addressDetails.phoneNumber,
                    "service": addressDetails.service
                }
                console.log(orderDTO);
                console.log(products);
                publicHook.post('/order', {
                    ...orderDTO
                }).then(response => {
                    setOrderId(response.data.id);
                    handleNext();
                }).catch(error => {
                    showNotification('Sth went wrong check address details, products', 'warning');
                });

                return true;
            },
            elementToDisplay: <Review addressDetails={addressDetails} />,
        },
        {
            name: "Payment details",
            buttonName: "Pay",
            onSubmit: function (): boolean {
                console.log('orderID: ' + orderId);
                //post  and redirect to url
                publicHook.post('/payment', null, {
                    params: {
                        "orderId": orderId
                    }
                }).then(response => {
                    console.log(response);
                    setPaymentID(response.data.paymentId);

                    // Extract the redirectUrl from the response
                    const redirectUrl = response.data.redirectUrl;

                    // Open the redirectUrl in a new tab
                    if (redirectUrl) {
                        window.open(redirectUrl, '_blank');
                        handleNext();
                        clearBasket();
                    } else {
                        showNotification('Redirect URL is missing', 'error');
                    }
                }).catch(error => {
                    showNotification('coś poszło nie tak', 'error');
                });


                return true;
            },
            elementToDisplay: <PaymentForm />,
        },
    ];
    const steps = ['Shipping address', 'Review your order', 'Payment details'];
    function getStepContent(step: number) {
        if (step < 0 || step > steps_1.length) {
            throw new Error('Unknown step');
        }
        return steps_1[step].elementToDisplay;
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ minHeight: { xs: '100%', sm: '80dvh' } }}>
                {/* INFO */}
                <Grid
                    item
                    xs={12}
                    sm={5}
                    lg={4}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        borderRight: { sm: 'none', md: '1px solid' },
                        borderColor: { sm: 'none', md: 'divider' },
                        alignItems: 'start',
                        pt: 4,
                        px: 10,
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: 500,
                        }}
                    >
                        <Info />
                    </Box>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={7}
                    lg={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor: { xs: 'transparent', sm: 'background.default' },
                        alignItems: 'start',
                        pt: { xs: 2, sm: 4 },
                        px: { xs: 2, sm: 10 },
                        gap: { xs: 1, md: 1 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { sm: 'space-between', md: 'flex-end' },
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: { sm: '100%', md: 600 },
                        }}
                    >
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                // height: 150,
                            }}
                        >
                            <Stepper
                                id="desktop-stepper"
                                activeStep={activeStep}
                                sx={{
                                    width: '100%',
                                    height: 40,
                                }}
                            >
                                {steps_1.map((step) => (
                                    <Step
                                        sx={{
                                            ':first-of-type': { pl: 0 },
                                            ':last-child': { pr: 0 },
                                        }}
                                        key={step.name}
                                    >
                                        <StepLabel>{step.name}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Box>
                    <Card
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            width: '100%',
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                ':last-child': { pb: 2 },
                            }}
                        >
                            <div>
                                <Typography variant="subtitle2" gutterBottom>
                                    Selected products
                                </Typography>
                                <Typography variant="body1">
                                    {activeStep >= 2 ? totalAllPayments : totalPrice}
                                </Typography>
                            </div>
                            <InfoMobile />
                        </CardContent>
                    </Card>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: { sm: '100%', md: 600 },
                            maxHeight: '720px',
                            gap: { xs: 5, md: 'none' },
                        }}
                    >
                        <Stepper
                            id="mobile-stepper"
                            activeStep={activeStep}
                            alternativeLabel
                            sx={{ display: { sm: 'flex', md: 'none' } }}
                        >
                            {steps_1.map((step) => (
                                <Step
                                    sx={{
                                        ':first-of-type': { pl: 0 },
                                        ':last-child': { pr: 0 },
                                        '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                                    }}
                                    key={step.name}
                                >
                                    <StepLabel
                                        sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                                    >
                                        {step.name}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {/* Tutaj dzieje sie magia  */}
                        {activeStep === steps_1.length ? (
                            <Stack spacing={2} useFlexGap>
                                <Typography variant="h1">📦</Typography>
                                <Typography variant="h5">Thank you for your order!</Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Your payment number is
                                    <strong>&nbsp;{paymentID}</strong>. We have emailed your order
                                    confirmation and will update you once its shipped.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        alignSelf: 'start',
                                        width: { xs: '100%', sm: 'auto' },
                                    }}
                                >
                                    Go to my orders
                                </Button>
                            </Stack>
                        ) : (
                            <Fragment>
                                {
                                    getStepContent(activeStep)
                                }
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                                        justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                                        alignItems: 'end',
                                        flexGrow: 1,
                                        gap: 1,
                                        pb: { xs: 12, sm: 0 },
                                        mt: { xs: 2, sm: 0 },
                                        mb: '60px',

                                    }}
                                >
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={handleBack}
                                            variant="text"
                                            sx={{
                                                display: { xs: 'none', sm: 'flex' },
                                            }}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={handleBack}
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                display: { xs: 'flex', sm: 'none' },
                                            }}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        endIcon={<ChevronRightRoundedIcon />}
                                        onClick={steps_1[activeStep].onSubmit}
                                        sx={{
                                            width: { xs: '100%', sm: 'fit-content' },
                                        }}
                                    // disabled={activeStep===0 && !isValid}
                                    >
                                        {steps_1[activeStep].buttonName}
                                    </Button>
                                </Box>
                            </Fragment>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default CheckoutPage;
