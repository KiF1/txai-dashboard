import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'

const createProductBodySchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
})
const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@ApiTags('Products') 
@Controller('/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class CreateProductController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    schema: {
      example: {
        id: '12345',
        name: 'Produto X',
        price: 50.0,
        quantity: 10,
        createdAt: '2024-10-05T14:48:00.000Z',
        creatorId: '12345abcde',
      },
    },
  }) 
  @ApiResponse({
    status: 400,
    description: 'Erro de validação no corpo da requisição.',
    schema: {
      example: {
        statusCode: 400,
        message: ['price deve ser um número'],
        error: 'Bad Request',
      },
    },
  })

  async handle(
    @Body(bodyValidationPipe) body: CreateProductBodySchema, @CurrentUser() user: UserPayload) {
    const { name, price, quantity, createdAt } = body
    const userId = user.sub

    await this.prisma.product.create({
      data: {
        creatorId: userId,
        name,
        price,
        quantity,
        createdAt
      },
    })
  }
}