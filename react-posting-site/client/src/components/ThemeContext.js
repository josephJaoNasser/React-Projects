import { useState, createContext, useContext } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import { connect } from 'react-redux'

const ThemeSetter = createContext()
const ThemeMode = createContext()

export function useSetThemeMode(){
  return useContext(ThemeSetter) 
}

export function useThemeMode(){
  return useContext(ThemeMode)
}

const ThemeContext = ({ children }) => {  
  const [isDarkTheme, setIsDarkTheme] = useState(JSON.parse(localStorage.getItem('isDarkTheme')))

  const handleThemeChange = ()=> {    
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('isDarkTheme', !isDarkTheme)   
  }

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
            <ThemeSetter.Provider value={ handleThemeChange }>
              { children }
            </ThemeSetter.Provider>
          </ThemeMode.Provider>
        </ThemeProvider> 
    </>
  )
}

export default ThemeContext

// const mapStateToProps = (state) => ({
//   isDarkTheme: state.themeMode.isDarkTheme
// })

// const mapDispatchToProps = (dispatch)=> ({
//     dispatchTheme: (mode) => dispatch({type: 'SWITCH_THEME_MODE', payload: mode})  
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ThemeContext)