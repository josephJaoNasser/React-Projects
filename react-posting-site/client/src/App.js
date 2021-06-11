import './App.css';
import { lazy, Suspense, useEffect } from 'react'

//material ui
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//router
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom'

//redux
import { connect } from 'react-redux'
import { loadUser } from './actions/authActions'

//routes
const Home = lazy(()=>import('./components/routes/Home'))
const Login = lazy(()=>import('./components/routes/Login'))
const Register = lazy(()=>import('./components/routes/Register'))
const Profile = lazy(()=>import('./components/routes/Profile'))
const Navigation = lazy(()=> import('./components/Navigation')) 

const useStyles = makeStyles(theme=> ({
  mainContainer:{
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    }
  }
}))

//component main
function App(props) { 

  const {
    isAuthenticated,
    token,
    user,
    loadUser
  } = props

  const classes = useStyles()

  useEffect(() => {    
    if(token){
      loadUser()
    }   
  }, [loadUser,token])

  const checkGuest = (routeComponent) => {
    if(!(isAuthenticated && token && user))
    {
      return(<Redirect to="/login"/>) 
    }
    else{
      return(routeComponent)
    }
  }

  const checkLoggedIn = (redirectTo, routeComponent) => {
    if((isAuthenticated && token && user))
    {
      return(<Redirect to={redirectTo}/>) 
    }
    else{ 
      return(routeComponent)
    }
  }

  return (    
    <div className="App">     
      <Router>
        <Suspense
          fallback={
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}>
              <CircularProgress/>
            </div>            
          }
        >
          <div className={classes.mainContainer}>        
            {
              (user && token) &&
              <Navigation 
                user={user}
              />
            }   
            <Switch>
              <Route path="/" exact >
                { checkGuest(<Home/>) }
              </Route> 

              <Route path="/login" exact>
                { checkLoggedIn('/',<Login/>) }  
              </Route>     

              <Route path="/register" exact>
                { checkLoggedIn('/',<Register/>) }
              </Route>

              <Route path="/profile" component={Profile}/>
            </Switch>
           
          </div>
          
        </Suspense>       
      </Router>          
    </div>    
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  user: state.auth.user
})


export default connect(mapStateToProps, { loadUser })(App);
