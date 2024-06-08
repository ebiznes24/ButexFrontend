import { Button, Container } from "@mui/material"
import { isExportDeclaration } from "typescript"
import BasketView from "../components/BasketView"

const BasketPage = () => {

    return(
        <Container>
            <BasketView/>
            {/* <Button
                href={`/butex/checkout`}
            >
                Checkout
            </Button> */}
        </Container>
    )
}

export default BasketPage
