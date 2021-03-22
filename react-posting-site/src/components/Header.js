import React from 'react'
import PropTypes from 'prop-types'

const Header = ({title}) => {
  return (
    <header>
      <h1 >{title}</h1>
    </header>
  )
}

//Define default props and prop types
Header.defaultProps = {
  title: 'Post App',
  words: ''
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
