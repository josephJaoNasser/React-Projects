//styles
import './App.css';

//components
import Header from './components/Header'
import Footer from './components/Footer';

//routes
import Login from './components/routes/Login'
import About from './components/routes/About'
import Home from './components/routes/Home'

//router
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  let title = 'Post App' 

  return (    
    <div className="App">
      <Header title={title}/>
      <Router>        
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>       
        <Footer />        
      </Router>          
    </div>    
  );
}



export default App;
