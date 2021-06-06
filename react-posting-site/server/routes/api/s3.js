require('dotenv/config')
const streamifier = require('streamifier');
const S3 = require('aws-sdk/clients/s3')

const profileImageBucket = process.env.AWS_PROFILE_IMAGE_BUCKET
const bucketRegion = process.env.AWS_BUCKET_REGION
const awsId = process.env.AWS_ID
const awsSecret = process.env.AWS_SECRET

const s3 = new S3({
  accessKeyId: awsId,
  secretAccessKey: awsSecret,
  region: bucketRegion
})

// upload
const uploadFiles = async (files) => {
  const params =[]

  files.forEach(file => {
    const fileStream = streamifier.createReadStream(file.buffer)
    const uploadParams = {
      Bucket: profileImageBucket,
      Body: fileStream,
      Key: file.filename
    }

    params.push(uploadParams)
  })  

  const res = await Promise.all(
    params.map(param => s3.upload(param).promise())
  ).catch(err=> {
    if(err) throw err
  })

  return res
}

// get profile image
const getUserProfileImage = async (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: profileImageBucket
  }

  const res = await s3.getObject(downloadParams).createReadStream()
  return res
}

exports.uploadFiles = uploadFiles
exports.getUserProfileImage = getUserProfileImage