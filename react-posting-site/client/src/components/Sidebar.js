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
  Button,
  //CircularProgress,
  Container,
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
  Typography,
}  from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, useTheme } from '@material-ui/core/styles';


//material UI drawer styling
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'relative'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  avatarDrawerOpen: {    
    transition: theme.transitions.create(['height','width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: theme.spacing(11),
    height: theme.spacing(11)    
  },
  avatarDrawerClose: {
    transition: theme.transitions.create(['height','width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  userTextOpen:{
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  userTextClosed: {
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    opacity: 0
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


// component main
const Sidebar = (props) => {
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
  
  const profilImageUrl = user.profile_image ? `/v1/users/${user._id}/profile-image/${user.profile_image}?size=small` : ''

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
                  color="main"
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

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Button style={{marginBottom: '10px'}}>
        <Container>
          <Avatar src={profilImageUrl} style={{width: 100, height: 100, margin: '8px auto'}} />
          <Typography variant="h5" gutterBottom >
            <strong>{user.dname}</strong>
          </Typography>
          <Typography variant="subtitle1" gutterBottom >
            @{user.uname}
          </Typography>
        </Container>
      </Button>      
      <Divider />      
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleMobileDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          {miniDrawer}

          {/* <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer> */}
        </Hidden>
      </nav>
     
    </>
  )
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func
}

export default connect(null, { logout })(Sidebar)
