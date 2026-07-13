import multer from "multer";

// Store uploaded file temporarily in memory
const storage = multer.memoryStorage();

// Accept only video files
const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed."), false);
    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    },

});

export default upload;