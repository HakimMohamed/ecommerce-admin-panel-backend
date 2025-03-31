import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

class S3Uploader {
  private static instance: S3Uploader;
  private s3: S3Client;
  private cloudFrontUrl: string;

  private constructor() {
    this.s3 = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    this.cloudFrontUrl = process.env.AWS_CLOUDFRONT_URL!;
  }

  public static getInstance(): S3Uploader {
    if (!S3Uploader.instance) {
      S3Uploader.instance = new S3Uploader();
    }
    return S3Uploader.instance;
  }

  public async uploadImage(filePath: string, contentType = 'image/jpeg'): Promise<string> {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const command = new PutObjectCommand({
      Bucket: 'stickers-image-storage',
      Key: fileName,
      Body: fileContent,
      ContentType: contentType,
    });

    await this.s3.send(command);

    return `${this.cloudFrontUrl}/${fileName}`;
  }
}

export default S3Uploader;
