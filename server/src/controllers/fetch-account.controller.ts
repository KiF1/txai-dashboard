import { NotFoundException, Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/services/prisma.service'

@Controller('/accounts/:id')
@UseGuards(JwtAuthGuard)

export class FetchAccountController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') accountId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: accountId },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    return user 
  }
}
