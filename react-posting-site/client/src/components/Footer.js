import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Link as MaterialUiLink } from '@material-ui/core'

const Footer = () => {
  const location = useLocation()

  if(location.pathname !== '/login'){
    return (
      <footer style={{margin: "3em"}}>
        <p>Copyright &copy; 2021</p>
        <Link to="/">
          <MaterialUiLink  
            component="button"
            variant="body2"
          >
            Home
          </MaterialUiLink>      
        </Link>&nbsp; | &nbsp;           
        <Link to="/about">
          <MaterialUiLink  
            component="button"
            variant="body2"
            
          >
            About
          </MaterialUiLink>     
        </Link>      
      </footer>
    )
  }
  else{
    return(
      <></>
    )
  }
}

export default Footer
