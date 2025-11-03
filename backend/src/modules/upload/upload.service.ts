import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as crypto from "crypto";

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = configService.get<string>("S3_BUCKET_NAME") || "";

    this.s3Client = new S3Client({
      region: configService.get<string>("AWS_REGION", "us-east-1"),
      credentials: {
        accessKeyId: configService.get<string>("AWS_ACCESS_KEY_ID") || "",
        secretAccessKey: configService.get<string>("AWS_SECRET_ACCESS_KEY") || "",
      },
    });
  }

  async generatePresignedUrl(
    fileName: string,
    fileType: string,
    userId: string
  ): Promise<{ url: string; fileKey: string }> {
    const fileExtension = fileName.split(".").pop() || "";
    const fileKey = `certificates/${userId}/${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      ContentType: fileType,
      Metadata: {
        userId,
        fileName,
      },
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return {
      url,
      fileKey,
    };
  }

  async generateGetPresignedUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return url;
  }

  getPublicUrl(fileKey: string): string {
    const domain = this.configService.get<string>("S3_BUCKET_DOMAIN") || "";
    return `${domain}/${fileKey}`;
  }
}

