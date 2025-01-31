import ImageKit from 'imagekit';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });


export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

console.log("ImageKit initialized");

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });