import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  if(location.pathname !== '/login'){
    return (
      <footer style={{margin: "3em"}}>
        <p>Copyright &copy; 2021</p>
        <Link to="/">Home</Link>&nbsp; | &nbsp;           
        <Link to="/about">About</Link>      
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
