import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, GetObjectCommand, 
          ListObjectsV2Command, DeleteObjectCommand, DeleteObjectsCommand, 
          DeleteObjectCommandOutput,
          DeleteObjectsCommandOutput,
          ListObjectsV2CommandOutput} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { environment } from '../../../../environment/environment.dev';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {

  private s3: S3Client;
  private bucketName: string = environment.BUCKET_NAME;
  private region: string = environment.S3_REGION;
  private accessKeyId: string = environment.ACCESS_KEY;
  private secretAccessKey: string = environment.SECRET_ACCESS_KEY;
  public cloudfrontDomain: string = environment.CLOUDFRONT_DOMAIN;

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

  // List objects in a specific folder in the S3 bucket
  // listObjectsWithName(folderPath: string, fileName: string) {
  async listObjectsWithName(folderPath: string): Promise<Observable<ListObjectsV2CommandOutput>> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: folderPath // List objects in the folder
    });

    // return from(this.s3.send(command)
    //         .then((data) => 
    //           data.Contents?.filter((item) => item.Key?.includes(fileName) || [])
    // ));

    return await from(this.s3.send(command));
  }

  // Delete objects with the specified names in the S3 bucket
  async deleteObjectsWithName(objectKeys: string[]): Promise<Observable<DeleteObjectsCommandOutput>> {
    const deleteParams = {
      Bucket: this.bucketName,
      Delete: {
        Objects: objectKeys.map(key => ({ Key: key }))
      }
    };

    const command = new DeleteObjectsCommand(deleteParams);
    return await from(this.s3.send(command));
  }

  // Delete single object from S3
  async deleteObjectByName(folderPath: string, objectKey: string): Promise<Observable<DeleteObjectCommandOutput>> {
      const deleteParams = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: `${folderPath}/${objectKey}`
      });
      
      return await from(this.s3.send(deleteParams));
  }

  // Upload file to S3
  async uploadFile(folderPath: string, file: File, fileName: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `${folderPath}/${fileName}`,
      Body: file,
      ContentType: file.type,
      // ACL: 'public-read',
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);

      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${folderPath}/${params.Key}`;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  }

  // Generate a signed URL for the file
  async getSignedUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 3600 }) // URL valid for 1 hour
  }
}
