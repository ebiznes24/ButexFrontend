import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
// import DribbbleIcon from '@mui/icons-material/Dribbble';
import logo from './../assets/logo512.png'; // import your logo image here
import { CssBaseline } from '@mui/material';

const Footer = () => {
    return (
        <Container maxWidth="xl">
          <Divider/>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">&copy; Butex™ 2024</Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end">
              <IconButton href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton href="#">
                <InstagramIcon />
              </IconButton>
              <IconButton href="#">
                <TwitterIcon />
              </IconButton>
              <IconButton href="#">
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
    );
  }
  
  export default Footer;