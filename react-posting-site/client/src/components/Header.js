import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from '@material-ui/core'

//redux

const Header = ({title, token, logout, justifyContent}) => {
  return (
    <header>
      <Container 
        style={{
          display: "flex", 
          justifyContent: justifyContent
        }}
      >
        <h2 >{title}</h2>
        {
          token &&
            <Button
              variant="outlined"
              style={{alignSelf: 'center'}}
              onClick={logout}
            >
              Logout
            </Button>
        }
        
      </Container>
      
        
    </header>
  )
}

//Define default props and prop types
Header.defaultProps = {
  title: 'Post App',
  justifyContent: 'center'
}

Header.propTypes = {
  title: PropTypes.string,
  justifyContent: PropTypes.string
}

export default Header