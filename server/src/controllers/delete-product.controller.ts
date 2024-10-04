import { BadRequestException, Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/services/prisma.service'

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)

export class DeleteProductController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  @HttpCode(204)
  
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') productId: string,
  ) {
    const userId = user.sub

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new BadRequestException('Produto Não encontrado')
    }

    if (product.creatorId !== userId) {
      throw new BadRequestException('Você não tem permissão para Deletar este produto.')
    }

    await this.prisma.product.delete({
      where: { id: productId }
    })
  }
}