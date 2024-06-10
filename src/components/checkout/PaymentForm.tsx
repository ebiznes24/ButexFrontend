import { Grid, Typography } from "@mui/material";


const PaymentForm: React.FC<{}> = ({ }) => {

    return (
        <Grid container spacing={2} display={'flex'} margin={1}>
            <Grid item>
                <Typography textAlign={'center'}>
                    Zamówienie zostało przyjęte, pozostało jedynie wnieśc opłatę i czekać na informację zwrotną mailem
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PaymentForm;