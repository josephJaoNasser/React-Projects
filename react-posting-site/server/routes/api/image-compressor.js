const sharp = require('sharp');


const compressSingle = async (file, res, next) => {
    
  let compressedFiles =[];
  let errors;
  
  if (!file){
    if(res)
        return res.status(400).json({
            msg: 'Please upload an image',
        })
    
    return {
        error: errors
    }
  };    
     
  let newFile = {...file};     
  const filenameLarge = file.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')        
  await sharp(file.buffer)
      .resize(600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameLarge
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })

  newFile = {...file};      
  const filenameMedium = file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')
  
  await sharp(file.buffer)
      .resize(320)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameMedium
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })
      
  newFile = {...file};   
  const filenameSmall = file.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1') 
  
  await sharp(file.buffer)
      .resize(150)
      .toFormat("jpeg")
      .jpeg({ quality: 70 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameSmall
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })
 
  

  if(errors){
    return {
        error: errors
    }
  }
  
  compressedFiles = compressedFiles.concat(file)
      
  if(next){
    next(errors, compressedFiles)
  }    
  else{
    return compressedFiles
  }
};



const compressMultiple = async (files, res, next) => {
    
  let compressedFiles =[];
  let errors;
  
  if (!files){
    if(res)
        return res.status(400).json({
            msg: 'Please upload an image'
        })
    
    return {
        error: 'Please upload an image'
    }
  };      
     
  await Promise.all(    
      files.map(async file => {    
          let newFile = {...file};     
          const filenameLarge = file.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')
          
          await sharp(file.buffer)
              .resize(1500)
              .toFormat("jpeg")
              .jpeg({ quality: 90 })
              .toBuffer({resolveWithObject:true})
              .then((output)=>{
                  newFile.filename = filenameLarge
                  newFile.buffer = output.data
                  newFile.size = output.info.size
                  compressedFiles.push(newFile)
              }).catch((err)=>{
                  errors = err
              })
      })
  );

  await Promise.all(    
      files.map(async file => {    
          let newFile = {...file};     
          const filenameMedium = file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')
          
          await sharp(file.buffer)
              .resize(600)
              .toFormat("jpeg")
              .jpeg({ quality: 80 })
              .toBuffer({resolveWithObject:true})
              .then((output)=>{
                  newFile.filename = filenameMedium
                  newFile.buffer = output.data
                  newFile.size = output.info.size
                  compressedFiles.push(newFile)
              }).catch((err)=>{
                  errors = err
              })
      })
  );    

  await Promise.all(    
      files.map(async file => {    
          let newFile = {...file};
          const filenameSmall = file.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1') 
          
          await sharp(file.buffer)
              .resize(400)
              .toFormat("jpeg")
              .jpeg({ quality: 70 })
              .toBuffer({resolveWithObject:true})
              .then((output)=>{
                  newFile.filename = filenameSmall
                  newFile.buffer = output.data
                  newFile.size = output.info.size
                  compressedFiles.push(newFile)
              }).catch((err)=>{
                  errors = err
              })     
      })
  );

  if(errors){
    return {
        error: errors
    }
  }

  files = files.concat(compressedFiles)

  if(next){
    next(errors, files)
  }    
  else{
    return files
  }
};

module.exports.compressSingle = compressSingle;
module.exports.compressMultiple = compressMultiple;