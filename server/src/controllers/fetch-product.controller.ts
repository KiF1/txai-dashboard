import { NotFoundException, Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/services/prisma.service'

@ApiTags('Products')
@Controller('/products/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class FetchProductController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca um produto pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado com sucesso.',
    schema: {
      example: {
        id: '1',
        name: 'Produto Exemplo',
        price: 100,
        quantity: 10,
        createdAt: '2024-10-05T00:00:00.000Z',
        creatorId: 'user-id-123',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Produto não encontrado.',
        error: 'Not Found',
      },
    },
  })
  
  async handle(@Param('id') productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado.')
    }

    return product 
  }
}
