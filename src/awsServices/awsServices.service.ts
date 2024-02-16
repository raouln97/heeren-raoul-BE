import axios from 'axios';
import AWS from 'aws-sdk';
import { AwsMultipleUploadBody } from './google.dto';
import { config } from '../config';

AWS.config.update({
  region: config.aws.region, // e.g., us-west-2
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
});

export class AwsService {
  async uploadFileToS3(bucketName, fileContent, fileName) {
    const match = fileContent.match(/^data:(.*?);base64,(.*)$/);
    if (match) {
      const mimeType = match[1];
      const base64EncodedData = match[2];
      const dataBuffer = Buffer.from(base64EncodedData, 'base64');

      const params = {
        Bucket: bucketName,
        Key: fileName, // File name you want to save as
        Body: dataBuffer,
        ContentType: mimeType,
      };

      const s3 = new AWS.S3();

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully at ${data.Location}`);
      });

      // Now you can use `dataBuffer` for operations like uploading to AWS S3
      // Make sure to pass `mimeType` along with `dataBuffer` to AWS S3 upload function to ensure correct content-type
    } else {
      console.error('Invalid or unsupported data URI');
    }
  }

  async uploadMultipleFilesToS3(
    bucketName: string,
    files: AwsMultipleUploadBody
  ) {
    const uploadPromises = files.bufferImages.map((file, index) =>
      this.uploadFileToS3(
        bucketName,
        file,
        `${files.clueAnswer} - ${index} - ${Date.now()}`
      )
    );

    return Promise.all(uploadPromises);
  }

  async getAllFiles(bucketName: string) {
    const s3 = new AWS.S3();

    const params = {
      Bucket: bucketName,
    };

    const arrOfUrls = [];
    const data = await s3.listObjects(params).promise();

    data.Contents.map(imageData => {
      console.log('Key here:', imageData.Key);
      arrOfUrls.push(`https://${bucketName}.s3.amazonaws.com/${imageData.Key}`);
    });

    console.log(arrOfUrls);

    return arrOfUrls;
  }

  // async getSongUrl() {
  //   const clientID = config.spotify.clientId;
  //   const clientSecret = config.spotify.clientSecret;
  //   const encoded = btoa(`${clientID}:${clientSecret}`);

  //   const accessTokenData = await axios.post(
  //     'https://accounts.spotify.com/api/token',
  //     {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Basic ${encoded}`,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: 'grant_type=client_credentials',
  //     }
  //   );
  //   const { access_token } = accessTokenData.data;
  //   console.log(access_token);

  //   const response = await axios.get(
  //     `https://api.spotify.com/v1/tracks/0FDzzruyVECATHXKHFs9eJ?si=RsCj-iWaQsC79zWwZPlKAA`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data.external_urls.spotify);
  //   return data;
  // }

  // async getSongUrl() {
  //   const clientID = config.spotify.clientId;
  //   const clientSecret = config.spotify.clientSecret;
  //   const encoded = Buffer.from(`${clientID}:${clientSecret}`).toString(
  //     'base64'
  //   );

  //   try {
  //     const accessTokenResponse = await axios.post(
  //       'https://accounts.spotify.com/api/token',
  //       'grant_type=client_credentials', // The data body needs to be a URL-encoded string
  //       {
  //         headers: {
  //           Authorization: `Basic ${encoded}`,
  //           'Content-Type': 'application/x-www-form-urlencoded', // Ensures the body is treated as URL-encoded form data
  //         },
  //       }
  //     );

  //     const { access_token } = accessTokenResponse.data;
  //     console.log(access_token);

  //     // Now, use the access token to call the Spotify Web API for track details
  //     const response = await axios.get(
  //       `https://api.spotify.com/v1/tracks/0FDzzruyVECATHXKHFs9eJ`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       }
  //     );

  //     console.log(response.data.external_urls.spotify); // Log the Spotify URL of the track
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching data from Spotify:', error);
  //     throw error; // Rethrow or handle error appropriately
  //   }
  // }
}
