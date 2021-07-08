import { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';

//router
import { Link, useLocation } from 'react-router-dom'

//redux
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'

//components
import ConfirmLogout  from './ConfirmLogout'

//material ui imports
import { 
  Avatar,
  AppBar,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CircularProgress,
}  from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useTheme } from '@material-ui/core/styles';

//import navigation styles from external file because it's too long
import useStyles from './NavigationDrawerStyles'

// component main
const Navigation = (props) => {
  const {
    window,
    logout
  }=props  
  
  const currentLocation = useLocation().pathname
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleLogoutToggle = () => {
    setLogoutOpen(!logoutOpen)
  }

  const onLogoutConfirm = () => {
    logout()
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  // drawer items
  const drawerItems = (
    <>
      <List>
        <Link to={`/`} style={{color: 'unset', textDecoration: 'none'}}>
          <ListItem button >
            <Avatar 
              src='' 
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
                    <CircularProgress/>
                </Typography>
              } 
              secondary='Loading user...'      
              className={clsx({
                [classes.userTextOpen]: open,
                [classes.userTextClosed]: !open,
              })}      
            />
          </ListItem>
        </Link>        
      </List>

      <Divider/>

      <List>
        <Link to={`/`} style={{color: 'unset', textDecoration: 'none'}}>
          <ListItem button selected={currentLocation === '/'}>
            <ListItemIcon>
              <HomeOutlinedIcon/>
            </ListItemIcon>
            <ListItemText >
              Home
            </ListItemText>
          </ListItem>
        </Link>   
        <Link to={`/`} style={{color: 'unset', textDecoration: 'none'}}>
          <ListItem button>
            <ListItemIcon>
              <MoreHorizIcon/>
            </ListItemIcon>
            <ListItemText>
              Somewhere else
            </ListItemText>
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
          onClick={handleLogoutToggle}
          startIcon={<ExitToAppIcon/>}
          >
            { open && 'Logout' }
          </Button>
        </ListItem>
      </List>
    </>
  )

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

      {drawerItems}          
      
    </Drawer>
  )
  
  //mobile drawer
  const mobileDrawer = (
    <Drawer
      className={clsx(classes.mobileDrawer, {
        [classes.mobileDrawerOpen]: open,
        [classes.mobileDrawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.mobileDrawerOpen]: open,
          [classes.mobileDrawerClose]: !open,
        }),
      }}
      container={container}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={open}
      onClose={handleDrawerToggle}            
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle}>
          {
            theme.direction === 'rtl' ? <ChevronRightIcon /> 
            : open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>     
      
      { drawerItems }

    </Drawer>
  );

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <ConfirmLogout 
          onConfirm={()=> onLogoutConfirm()} 
          onCancel={handleLogoutToggle}
          open={logoutOpen}
        />
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
                onClick={handleDrawerToggle}
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
  logout: PropTypes.func
}

export default connect(null, { logout })(Navigation)
