import React, { useState, createContext, useContext } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const ThemeSetter = createContext()
const ThemeMode = createContext()

export function useSetThemeMode(){
  return useContext(ThemeSetter) 
}

export function useThemeMode(){
  return useContext(ThemeMode)
}

export const ThemeContext = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const theme = createMuiTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: '#015fa9',
        dark: '#0089f5'
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f'
      },
      background: {
        paper: isDarkTheme ? '#303030' : '#fff' 
      }
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    },
    
  })

  return (    
    <>
      <CssBaseline />
        <ThemeProvider theme={theme}>
          <ThemeMode.Provider value={ isDarkTheme }>
            <ThemeSetter.Provider value={ setIsDarkTheme }>
              {children}
            </ThemeSetter.Provider>
          </ThemeMode.Provider>
        </ThemeProvider> 
    </>
  )
}