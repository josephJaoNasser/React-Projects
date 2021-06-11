import React from 'react'
import PropTypes from 'prop-types'
import { Container, Typography } from '@material-ui/core'

//material ui styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=> ({
  headerText:{
    margin:'1rem 0 1rem 0',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    }
  }
}))

//component main
const Header = ({title}) => {
  const classes = useStyles()
  return (
    <header>
      <Container >
        <Typography 
          variant='h4' 
          component='h4'
          className={classes.headerText}
        >
          <b>{title}</b>
        </Typography>        
      </Container>
      
        
    </header>
  )
}

//Define default props and prop types
Header.defaultProps = {
  title: 'Post App'
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header