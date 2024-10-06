import { Controller, FileTypeValidator, HttpCode, InternalServerErrorException, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UploadService } from 'src/services/upload.service'

@ApiTags('Upload')
@Controller('/upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class UploadPhotoController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Faz upload de uma foto' }) 
  @ApiResponse({
    status: 201,
    description: 'Foto enviada com sucesso.',
    schema: {
      example: {
        photoUrl: 'https://upload-txai.s3.amazonaws.com/nome-do-arquivo.jpg',
      },
    },
  }) 
  @ApiResponse({
    status: 500,
    description: 'Erro ao enviar o arquivo para o S3.',
  })
  
  async handle(
    @UploadedFile(new ParseFilePipe({validators: 
        [
          // 10mb upload
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      await this.uploadService.upload(file.originalname, file.buffer, file.mimetype)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao enviar o arquivo para o S3.');
    }

    const photoUrl = new URL(`https://upload-txai.s3.amazonaws.com/${file.originalname}`).toString()
    return { photoUrl }
  }
}