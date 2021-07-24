import { useState, useContext, createContext } from 'react'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const ThemeSetter = createContext()
const ThemeMode = createContext()

export const useThemeSetter = () => useContext(ThemeSetter)
export const useThemeMode = () =>  useContext(ThemeMode) 

const AppThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const theme = createTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: '#0abeff',
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
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ThemeSetter.Provider value={setIsDarkTheme}>
          <ThemeMode.Provider value={isDarkTheme}>
            { children  }
          </ThemeMode.Provider>
        </ThemeSetter.Provider>
      </ThemeProvider>
    </CssBaseline>    
    
  )
}

export default AppThemeProvider