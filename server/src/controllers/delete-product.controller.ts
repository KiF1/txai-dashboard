import { BadRequestException, Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/services/prisma.service'

@ApiTags('Products') 
@Controller('/products/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class DeleteProductController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta um produto' }) 
  @ApiResponse({
    status: 204,
    description: 'Produto deletado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Produto não encontrado ou usuário sem permissão.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Produto Não encontrado',
        error: 'Bad Request',
      },
    },
  }) 
  
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