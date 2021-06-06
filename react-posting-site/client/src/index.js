import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//material UI
import { CircularProgress } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//redux
import { Provider } from 'react-redux'
import store from './store/Store'

const App = lazy(() => import('./App'))

//material UI theming
let mode = "dark"
let paperColor;
let mainTextColor;

if(mode === 'dark'){
  paperColor = '#303030'
  mainTextColor = '#0089f5'
}

const theme = createMuiTheme({
  palette: {
    type: mode,
    primary: {
      main: mainTextColor ? mainTextColor : '#015fa9'
    },
    background: {
      paper: paperColor ? paperColor : '#fff' 
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
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
        <App />
      </Suspense>  
    </ThemeProvider>  
  </Provider>    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
