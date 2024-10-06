import { BadRequestException, Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/services/prisma.service'

@ApiTags('Accounts') 
@Controller('/accounts/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class DeleteAccountController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta um usuário' }) 
  @ApiResponse({
    status: 204,
    description: 'Usuário deletado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário sem permissão.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Seu usuário não tem permissão para deletar este usuário.',
        error: 'Bad Request',
      },
    },
  }) 
  
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') accountId: string,
  ) {
    const userId = user.sub

    const account = await this.prisma.user.findUnique({
      where: { id: accountId },
    })

    const userLogged = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!account) {
      throw new BadRequestException('Usuário Não encontrado')
    }

    if (userLogged.position !== 'admin') {
      throw new BadRequestException('Você não tem permissão para Deletar este usuário.')
    }

    await this.prisma.product.deleteMany({
      where: { creatorId: accountId }
    })

    await this.prisma.user.delete({
      where: { id: accountId }
    })
  }
}