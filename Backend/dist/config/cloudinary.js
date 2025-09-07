import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: 'dbwnjrv0a',
    api_key: '751653151213564',
    api_secret: process.env.CLOUD_SECRET
});
export default cloudinary;
