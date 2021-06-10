import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';

//router
import { Link } from 'react-router-dom'

//redux
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'

//material ui imports
import { 
  Avatar,
  AppBar,
  Button,
  //CircularProgress,
  //CssBaseline,
  Divider,
  Drawer,
  Hidden,
  //Icon,
  IconButton,
  List,
  ListItem,
  //ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
}  from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';

//import navigation styles from external file because it's too long
import useStyles from './NavigationDrawerStyles'

// component main
const Navigation = (props) => {
  const {
    user,
    window,
    logout
  }=props

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
    
  const container = window !== undefined ? () => window().document.body : undefined;
  const profilImageUrl = user.profile_image ? `/v1/users/${user._id}/profile-image/${user.profile_image}?size=small` : ''

  //mini drawer for desktop version
  const miniDrawer = (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle}>
          {
            theme.direction === 'rtl' ? <ChevronRightIcon /> 
            : open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List>
        <Link to='/profile' style={{color: 'unset', textDecoration: 'none'}}>
          <ListItem button>
            <Avatar 
              src={profilImageUrl} 
              className={clsx(classes.avatar,{
                [classes.avatarDrawerOpen]: open,
                [classes.avatarDrawerClose]: !open,
              })}
            />          
            <ListItemText 
              primary={
                <Typography 
                  variant="h5" 
                  component="h5"                   
                >
                    {user.dname}
                </Typography>
              } 
              secondary={user.uname}      
              className={clsx({
                [classes.userTextOpen]: open,
                [classes.userTextClosed]: !open,
              })}      
            />
          </ListItem>
        </Link>        
      </List>

      <Divider />
      <List>
        <ListItem>
          <Button 
          variant='outlined' 
          color='secondary'        
          fullWidth
          onClick={logout}
          startIcon={<ExitToAppIcon/>}
          >
            { open && 'Logout' }
          </Button>
        </ListItem>
      </List>
      
    </Drawer>
  )
  
  //mobile drawer
  const mobileDrawer = (
    <Drawer
      className={clsx(classes.mobileDrawer, {
        [classes.mobileDrawerOpen]: mobileOpen,
        [classes.mobileDrawerClose]: !mobileOpen,
      })}
      classes={{
        paper: clsx({
          [classes.mobileDrawerOpen]: mobileOpen,
          [classes.mobileDrawerClose]: !mobileOpen,
        }),
      }}
      container={container}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleMobileDrawerToggle}            
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleMobileDrawerToggle}>
          {
            theme.direction === 'rtl' ? <ChevronRightIcon /> 
            : mobileOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List>
        <Link to='/profile' style={{color: 'unset', textDecoration: 'none'}}>
          <ListItem button>
            <Avatar 
              src={profilImageUrl} 
              className={clsx(classes.avatar,{
                [classes.avatarDrawerOpen]: mobileOpen,
                [classes.avatarDrawerClose]: !mobileOpen,
              })}
            />          
            <ListItemText 
              primary={
                <Typography 
                  variant="h5" 
                  component="h5"                   
                >
                    {user.dname}
                </Typography>
              } 
              secondary={user.uname}      
              className={clsx({
                [classes.userTextOpen]: mobileOpen,
                [classes.userTextClosed]: !mobileOpen,
              })}      
            />
          </ListItem>
        </Link>        
      </List>

      <Divider />
      <List>
        <ListItem>
          <Button 
          variant='outlined' 
          color='secondary'        
          fullWidth
          onClick={logout}
          startIcon={<ExitToAppIcon/>}
          >
            { mobileOpen && 'Logout' }
          </Button>
        </ListItem>
      </List>       
    </Drawer>
  );

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <AppBar            
            position="absolute"
            color='inherit'
            elevation={0}
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleMobileDrawerToggle}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
            <Divider/>
          </AppBar>  

          {mobileDrawer}

        </Hidden>
        
        <Hidden xsDown implementation="css">
          {miniDrawer}
        </Hidden>
      </nav>
     
    </>
  )
}

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func
}

export default connect(null, { logout })(Navigation)
