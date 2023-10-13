const { MovieRepository } = require('../repository');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const CONFIG = require('../configs');

class MovieService {
    static async getMovies(page, size) {
        try {
            return await MovieRepository.getMovies(page, size);
        } catch (error) {
            throw error;
        }
    }

    static async insertMovie(title, genres, year) {
        try {
            await MovieRepository.insertMovie(title, genres, year);
        } catch (error) {
            throw error;
        }
    }

    static async uploadMovieImageLocal(id, imageURL) {
        try {
            await MovieRepository.uploadMovieImage(id, imageURL);
        } catch (error) {
            throw error;
        }
    }

    static async uploadMovieImageCloud(id, filename, buffer) {
        try {

            const uploadToCloudinary = (filename, buffer, cloudinaryConfig) => {
                cloudinary.config(cloudinaryConfig);
                return new Promise((resolve, reject) => {
                  const stream = cloudinary.uploader.upload_stream(
                    {
                      folder: `${CONFIG.APP.NAME}/img`,
                      filename_override: filename,
                      unique_filename: false,
                      use_filename: true,
                    },
                    (error, result) => {
                      if (error) {
                        // console.error(error);
                        reject(new Error(`Error occurred during file upload: ${error.message}`));
                      } else {
                        resolve(result);
                      }
                    }
                  );
                  streamifier.createReadStream(buffer).pipe(stream);
                });
            };
            
            const cloudinaryConfig = {
                cloud_name: CONFIG.CLOUDINARY.CLOUD_NAME,
                api_key: CONFIG.CLOUDINARY.API_KEY,
                api_secret: CONFIG.CLOUDINARY.API_SECRET,
                secure: true,
            }
            
            const result = await uploadToCloudinary(filename, buffer, cloudinaryConfig);            
            const imageURL = result.secure_url;
            await MovieRepository.uploadMovieImage(id, imageURL);
        } catch (error) {
            throw error;
        }
    }

    static async deleteMovieById(id) {
        try {
            await MovieRepository.deleteMovieById(id);
        } catch (error) {
            throw error;
        }
    }

    static async updateMovieById(id, title, genres, year) {
        try {
            await MovieRepository.updateMovieById(id, title, genres, year);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovieService;