import { Button, Container } from "@mui/material"
import { isExportDeclaration } from "typescript"

const BasketPage = () => {

    return(
        <Container>
            Basket Page
            <Button
                href={`/butex/checkout`}
            >
                Checkout
            </Button>
        </Container>
    )
}

export default BasketPage
