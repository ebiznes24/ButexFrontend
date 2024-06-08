import { Box, Container } from "@mui/material"
import { Link, Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { NotificationSnackBar } from "./NotificationSnackBar"

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
                    minHeight: '80vh',
                    margin: '1em auto',
                    display: 'flex',
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
                <Footer/>
            </Container>
            <NotificationSnackBar/>
        </Box>
    )
}

export default Layoute