import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './services/prisma.service';
import { envSchema } from 'src/env'
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateProductController } from './controllers/create-product.controller';
import { FetchRecentProductsController } from './controllers/fetch-products.controller';
import { EditProductController } from './controllers/edit-product.controller';
import { DeleteProductController } from './controllers/delete-product.controller';
import { FetchAccountController } from './controllers/fetch-account.controller';
import { EditAccountController } from './controllers/edit-account.controller';
import { UploadPhotoController } from './controllers/upload-photo.controller';
import { UploadService } from './services/upload.service';
import { FetchProductController } from './controllers/fetch-product.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [
    CreateAccountController, 
    AuthenticateController, 
    CreateProductController, 
    FetchRecentProductsController, 
    EditProductController,
    DeleteProductController,
    FetchAccountController,
    EditAccountController,
    UploadPhotoController,
    FetchProductController
  ],
  providers: [PrismaService, UploadService],
})
export class AppModule {}
