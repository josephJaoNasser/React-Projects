module.exports.validateUser = (user) => {
  const { 
    username, 
    displayName, 
    password, 
    confirm_password, 
    email
  } = user

  const checkUserName = new Promise((resolve,reject)=>{
    //check if user typed in a proper username
    if(username?.length < 1){
      reject({
        msg: 'Please type in a username!',
        field: 'username'
      }) 
    }
    else if(username.length > 15){
      reject ({
          msg: 'Username must be less than 16 characters',
          field: 'username'
      });   
    }
    else if (/\s/.test(username)) 
    {
      reject({
            msg: 'Username must not contain any spaces',
            field: 'username'
        });   
    }
  
    //find existing/duplicate username
    User.findOne({ uname: username }).then(user => {
      if(user){
        reject({
          msg: 'This username is already registered!',
          field: 'username'
        });   
      }
      else{
        resolve(true)
      }
    })
    
  })
  
  const checkDisplayName = new Promise((resolve, reject)=>{
    //check if user typed in a display name
    if(displayName?.length < 1){
      reject({
          msg: 'Please type in a display name!',
          field: 'displayName'
      });    
    }
    else if(displayName.length >50){
      reject({
          msg: 'Display Name must be 50 characters or less!',
          field: 'displayName'
      });   
    }
    else{
      resolve(true)
    }
  })
  
  const checkPassword = new Promise((resolve, reject)=>{
    //check if password is at least 6 characters
    if(password?.length < 6){
      reject({
          msg: 'Password must be at least 6 characters!',
          field: 'password'
      });    
    }

    //check if password is at least 6 characters
    if(password !== confirm_password){
      reject({
          msg: 'Passwords do not match!',
          field: 'password'
      });     
        
    }
    else{
      resolve(true)
    }

  })

  const checkEmail = new Promise((resolve, reject)=>{
    //check propper email format
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;   
    if(!emailRegex.test(email)){
      reject({
          msg: 'Please input a valid e-mail address!',
          field: 'email'
      });
    }
    //check if email exists
    User.findOne({ email }).then(user => {    
      if(user){      
        reject({
          msg: 'This email is already registered!',
          field: 'email'
        });   
      }
      else{
        resolve(true)
      }
    })
    
  })

  const isValidated = Promise.all([
    checkUserName,
    checkDisplayName,
    checkPassword,
    checkEmail
  ]).then(success =>{
    return {
      success
    }
  }).catch(err => {
    return {
      ...err,
      success: false
    }
  })

  return isValidated
  
}
