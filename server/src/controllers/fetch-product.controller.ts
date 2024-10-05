import { NotFoundException, Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/services/prisma.service'

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)

export class FetchProductController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
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
