import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BiMenu } from 'react-icons/bi'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../assets/logo.png';
import Icon from '../assets/icon.png'
const drawerWidth = 240;
const navItems = [{ name: 'TikTok Podcast', link: 'https://talkthetok.com' }, { name: 'TikTok Tools', link: 'https://toktools.com' }, { name: 'Download TikTok MP3', link: '' }];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} style={{ fontWeight: '900' }} >
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        LOGO
      </Typography> */}
      <img src={Logo} alt="logo" className='HideOnMobile' style={{ width: '90%' }} />
      <Divider />
      <List  >
        {navItems.map((item) => (
          <ListItem key={item.name} >
            <ListItemButton href={item.link} target={'_blank'} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Button  color='secondary' variant='outlined' href={'https://chrome.google.com/webstore/detail/tokaudit-tiktok-sorting-a/cijmoklipjlcmdipoacmehggpggoaman'} target='_blank'
            style={{ textTransform: 'none', width: 'fit-content', background: 'linear-gradient(90deg, #000000 10%, #260134 70%)', borderRadius: '7px', border: '2px #d5d1d1 solid', margin: '7px', scale:'0.75', position:'absolute', left:'-13px', margin:'auto' }} >
            <div className='GetExtensionButton ' >

              <img style={{ width: '44px', height: '39px' }} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Google_Chrome_Web_Store_icon_2015.svg/1200px-Google_Chrome_Web_Store_icon_2015.svg.png"} />
              <div style={{ marginBottom: '-2px', marginLeft:'5px' }} >
                <div style={{ fontSize: '12px', fontWeight: '100', marginBottom: '-8px', textAlign: 'left', paddingBlock: '3px' }} >
                  GET THE EXTENSION ON</div>
                <div style={{ fontSize: '20px',whiteSpace:'nowrap' }} >Chrome Web Store</div>
              </div>

            </div>
          </Button>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color='default' >
        <Toolbar style={{ width: '90%', margin: 'auto' }} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, marginLeft: 'auto' }}
          >
            <BiMenu />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            color='primary'
            className='NavbarLogo'
            sx={{ display: { md: 'block' } }}
          >
                  <img src={Logo} alt="logo"/* className='HideLogoOnMobile'*/ style={{  width: '200px', cursor:'pointer', marginBottom:'-7px' }} />
                  {/* <img src={Icon} alt="icon" className='HideLogoOnDesktop' style={{ width: '30px', cursor:'pointer', marginBottom:'-7px' }} /> */}

          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} style={{ margin: 'auto', width: '50%' }}>
            {navItems.map((item) => (
              <Button key={item} href={item.link} target={'_blank'} color='secondary' style={{ textTransform: 'none', margin: 'auto' }} >
                {item.name}
              </Button>
            ))}
          </Box>

          <Button className='HideExtensionOnMobile' color='secondary' variant='outlined' href={'https://chrome.google.com/webstore/detail/tokaudit-tiktok-sorting-a/cijmoklipjlcmdipoacmehggpggoaman'} target='_blank'
            style={{ textTransform: 'none', width: 'fit-content', background: 'linear-gradient(90deg, #000000 10%, #260134 70%)', borderRadius: '7px', border: '2px #d5d1d1 solid', margin: '7px', scale:'0.75' }} >
            <div className='GetExtensionButton ' >

              <img style={{ width: '44px', height: '39px' }} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Google_Chrome_Web_Store_icon_2015.svg/1200px-Google_Chrome_Web_Store_icon_2015.svg.png"} />
              <div style={{ marginBottom: '-2px', marginLeft:'5px' }} >
                <div style={{ fontSize: '12px', fontWeight: '100', marginBottom: '-8px', textAlign: 'left', paddingBlock: '3px' }} >
                  GET THE EXTENSION ON</div>
                <div style={{ fontSize: '20px',whiteSpace:'nowrap' }} >Chrome Web Store</div>
              </div>

            </div>
          </Button>

        </Toolbar>
      </AppBar>
      <Box component="nav"   >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none', },

            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  );
}


export default Navbar;