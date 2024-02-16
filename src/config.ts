import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 9000;
const REGION = process.env.REGION;
const ACCESSKEYID = process.env.ACCESS_KEY_ID;
const SECRETACCESSKEY = process.env.SECRET_ACCESS_KEY;
const SPOTIFYCLIENTID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFYCLIENTSECRET = process.env.SPOTIFY_CLIENT_SECRET;

export const config = {
  server: {
    port: PORT,
  },
  aws: {
    region: REGION,
    accessKeyId: ACCESSKEYID,
    secretAccessKey: SECRETACCESSKEY,
  },
  spotify: {
    clientId: SPOTIFYCLIENTID,
    clientSecret: SPOTIFYCLIENTSECRET,
  },
};
