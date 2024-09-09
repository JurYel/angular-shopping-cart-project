import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {

  private s3: S3Client;
  private bucketName: string = 'revalida-angular-shop-app';
  private region: string = 'ap-southeast-1';
  private accessKeyId: string = 'AKIAXQISFHH2YFJA4EMJ';
  private secretAccessKey: string= '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';

  constructor() { 
    // Initialize the S3 client with the credentials
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  // Upload file to S3
  async uploadFile(file: File, fileName: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `assets/users/${fileName}`,
      Body: file,
      ContentType: file.type,
      // ACL: 'public-read',
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);

      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${params.Key}`;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  }

  // Generate a signed URL for the file
  async getSignedUrl(fileKey: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 3600 }) // URL valid for 1 hour
  }
}
