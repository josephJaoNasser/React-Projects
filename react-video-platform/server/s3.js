require('dotenv/config')
const S3 = require('aws-sdk/clients/s3')

const createUploadParams = (file) => {

  const s3 = new S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_BUCKET_REGION
  })
  
  
  return s3.createMultipartUpload({
    Bucket: process.env.AWS_BUCKET,
    Key: file.filename,
    ACL: 'public-read'
  }).promise()
}

//abort an upload
const abortUpload = async (params) => {

  const s3 = new S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_BUCKET_REGION
  })
  

  if(!params){
    return console.error('Nothing to abort')
  }

  try{
    const abortData = await s3.abortMultipartUpload(params).promise()
    return abortData
  }
  catch(err){
    console.error(err)
    return Promise.reject(err)
  }
}

module.exports = { createUploadParams, abortUpload }
