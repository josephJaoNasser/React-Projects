import './App.css';
import AppThemeProvider from './components/AppThemeProvider'
import { Paper, CircularProgress } from '@material-ui/core'
import { lazy, Suspense } from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const HomePage = lazy(()=>import('./components/routes/HomePage'))
const VideoPage = lazy(()=>import('./components/routes/VideoPage'))
const UploadPage = lazy(()=>import('./components/routes/UploadPage'))

/*****************
 *  APP MAIN
 ******************/
function App() {

  return (
    <div className="App">      
      <AppThemeProvider>
        <Paper style={{height: '100vh',overflowY: 'auto', borderRadius: 0}}>
          
          <Router>
            <Suspense fallback={
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}>
                <CircularProgress/>
              </div>       
            }>
              <Switch>
                <Route exact path='/'>
                  <HomePage/>                
                </Route>
                
                <Route exact path='/upload'>
                  <UploadPage/>                
                </Route>

                <Route exact path='/watch'>
                  <VideoPage/>                
                </Route>              
              </Switch>
            </Suspense>
          </Router>

        </Paper>
      </AppThemeProvider>
    </div>
  );
}

export default App;
