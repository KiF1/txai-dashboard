import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))
const queryPageValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const orderByDateQueryParamSchema = z.string().optional().default('desc')
const queryOrderByDateValidationPipe = new ZodValidationPipe(orderByDateQueryParamSchema)
type OrderByDateQueryParamSchema = z.infer<typeof orderByDateQueryParamSchema>

const orderByAlphabeticQueryParamSchema = z.string().optional().default('asc')
const queryOrderByAlphabeticValidationPipe = new ZodValidationPipe(orderByAlphabeticQueryParamSchema)
type OrderByAlphabeticQueryParamSchema = z.infer<typeof orderByAlphabeticQueryParamSchema>


@Controller('/products')
@UseGuards(JwtAuthGuard)

export class FetchRecentProductsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  
  async handle(
      @Query('page', queryPageValidationPipe) page: PageQueryParamSchema,
      @Query('orderByDate', queryOrderByDateValidationPipe) orderByDate: OrderByDateQueryParamSchema,
      @Query('orderByAlphabetic', queryOrderByAlphabeticValidationPipe) orderByAlphabetic: OrderByAlphabeticQueryParamSchema
    ) {
      const perPage = 1

      const products = await this.prisma.product.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: [
          { createdAt: orderByDate as 'asc' | 'desc' },
          { name: orderByAlphabetic as 'asc' | 'desc' },
        ]
      })

      const totalProducts = await this.prisma.product.count()

      return { products, totalProducts }
    }
}