import React, { useState } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const ThemeContext = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light')

  //material UI theming
  let paperColor;
  let mainTextColor;

  if(themeMode === 'dark'){
    paperColor = '#303030'
    mainTextColor = '#0089f5'
  }

  const theme = createMuiTheme({
    palette: {
      type: themeMode,
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



  return (    
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider> 
    </>
  )
}

export default ThemeContext
