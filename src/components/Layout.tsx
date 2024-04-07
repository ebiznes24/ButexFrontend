import { Box, Container } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

const Layoute: React.FC<{}> = ({}) => {


    return(
        <Box>
            <Container
                sx={{
                    minHeight: '10vh'
                }}
            >
                Header
            </Container>
            <Container
            sx={{
                minHeight: '80vh'
            }}
            >
                <Link to={'/butex/'} >Home</Link><br></br>
                <Link to={'/butex/item'} >Item</Link><br></br>
                <Link to={'/butex/basket'} >Basket</Link><br></br>
                <Outlet/>               
            </Container>
            <Container
            sx={{
                minHeight: '10vh'
            }}
            >
                Footer
            </Container>
        </Box>
    )
}

export default Layoute