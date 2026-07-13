import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/**
 * Uploads a video buffer to Cloudinary
 * @param {Buffer} buffer
 * @returns {Promise<Object>}
 */
export const uploadVideo = (buffer) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                resource_type: "video",

                folder: "InterviewAI/interviews",

                overwrite: false,
            },

            (error, result) => {

                if (error) {
                    return reject(error);
                }

                // resolve(result);
                resolve({
                    publicId: result.public_id,
                    videoUrl: result.secure_url,
                    duration: result.duration,
                    format: result.format,
                });

            }

        );

        streamifier.createReadStream(buffer).pipe(stream);

    });

};