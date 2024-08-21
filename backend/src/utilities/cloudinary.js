import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const cloud_name=process.env.CLOUDINARY_CLOUD_NAME;
const api_key=process.env.CLOUDINARY_API_KEY;
const api_secret=process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'onlineJudge',
    }
});

const upload = multer({ storage: storage });

export { cloudinary, upload };