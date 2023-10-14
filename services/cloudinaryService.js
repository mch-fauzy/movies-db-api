const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const CONFIG = require('../configs');
const { AuthenticationError, InternalError, logger } = require('../utils');
const { StatusCodes } = require('http-status-codes');

class CloudinaryService {
    static configureCloudinary() {
        const cloudinaryConfig = {
            cloud_name: CONFIG.CLOUDINARY.CLOUD_NAME,
            api_key: CONFIG.CLOUDINARY.API_KEY,
            api_secret: CONFIG.CLOUDINARY.API_SECRET,
            secure: true,
        };
        cloudinary.config(cloudinaryConfig);
    }

    static uploadImageToCloudinary(filename, buffer) {
        this.configureCloudinary();

        const imgUploadOptions = {
            folder: `${CONFIG.APP.NAME}/img`,
            filename_override: filename,
            unique_filename: false,
            use_filename: true,
        };

        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                imgUploadOptions,
                (error, result) => {
                    if (error) {
                        if (error.http_code === StatusCodes.UNAUTHORIZED) {
                            logger.error(`[CloudinaryService - uploadImageToCloudinary] Failed to upload image in Cloudinary: ${error.message}`);
                            reject(new AuthenticationError("Failed to upload image in Cloudinary"));
                            return;
                        }
                        logger.error(`[CloudinaryService - uploadImageToCloudinary] Internal server error: ${error.message}`);
                        reject(new InternalError("Internal server error"));
                        return;
                    }
                    resolve(result);
                }
            );
            streamifier.createReadStream(buffer).pipe(stream);
        });
    }
}

module.exports = CloudinaryService;
