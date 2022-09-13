const cloudinary = require("../config/cloudinary.config");
const streamifier = require("streamifier");

const streamUpload = (file, publicId, folder) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: publicId, folder },
      (err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
const uploadFile = async (file, publicId, folder) => {
  try {
    const uploadedFile = await streamUpload(file, publicId, folder);
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async (publicId) => {
  try {
    const deletedFile = await cloudinary.uploader.destroy(publicId);
    return deletedFile;
  } catch (error) {
    console.log(error);
  }
};

const uploadProductPic = async (file, publicId, folder) => {
  try {
    const uploadedFile = await streamUpload(file, publicId, folder);
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadFile, deleteFile, uploadProductPic };
