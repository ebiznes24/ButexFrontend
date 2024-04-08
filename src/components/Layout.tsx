import { Box, Container } from "@mui/material"
import { Link, Outlet } from "react-router-dom"
import Header from "./Header"

const Layoute: React.FC<{}> = ({ }) => {


    return (
        <Box>
            <Container
                maxWidth={false}
                disableGutters={true}
                sx={{
                    minHeight: '10vh'
                }}
            >
                <Header/>
            </Container>
            <Container
                sx={{
                    minHeight: '80vh'
                }}
            >
                <Outlet />
            </Container>
            <Container
                maxWidth={false}
                disableGutters={true}
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