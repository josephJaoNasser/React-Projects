import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CircularProgress } from '@material-ui/core';

//redux
import { Provider } from 'react-redux'
import store from './store/Store'

const App = lazy(() => import('./App'))

ReactDOM.render(
  <Provider store={store}>
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
    
  </Provider>    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
