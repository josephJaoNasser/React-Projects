import './App.css';
import { lazy, Suspense } from 'react'
import { CircularProgress } from '@material-ui/core';

//router
import { BrowserRouter as Router, Route } from 'react-router-dom'

//components
const Header = lazy(()=>import('./components/Header'))
const Footer = lazy(()=>import('./components/Footer'))

//routes
const Home = lazy(()=>import('./components/routes/Home'))
const Login = lazy(()=>import('./components/routes/Login'))
const About = lazy(()=>import('./components/routes/About'))
const Register = lazy(()=>import('./components/routes/Register'))


function App() {
  let title = 'Post App' 

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
          <Header title={title}/>
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/about" component={About}/>     
          <Route path="/register" component={Register}/>       
          <Footer />        
        </Suspense>       
      </Router>          
    </div>    
  );
}



export default App;
