const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next){
  const token = req.header('x-auth-token')
  //check for token
  if(!token){
    return res.status(401).json({
      msg: 'No token. Access denied',
      success: false
    })
  }

  try{
    //verify token
    const decoded = jwt.verify(token,config.get('jwtSecret'))
    //add user from payload
    req.user = decoded;
    next()
  }catch(err){
    return res.status(400).json({
      msg: 'The token sent was invalid. Access denied'
    })
  }      
}

module.exports = auth