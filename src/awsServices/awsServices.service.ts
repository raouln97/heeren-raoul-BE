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
      this.uploadFileToS3(bucketName, file, `testing - ${index}`)
    );

    return Promise.all(uploadPromises);
  }
}
