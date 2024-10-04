import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploadService{
  private readonly s3Cient = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'), 
    credentials: 
      { 
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'), 
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY')
      } 
  })
  constructor(private readonly configService: ConfigService){}

  async upload(fileName: string, file: Buffer, mimeType: string){
    await this.s3Cient.send(new PutObjectCommand({
      Bucket: 'upload-txai',
      Key: fileName,
      Body: file,
      ContentType: mimeType
    }))
  }
}