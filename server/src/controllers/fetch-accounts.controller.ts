import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/services/prisma.service'

@ApiTags('Accounts')
@Controller('/accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class FetchAccountsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca de usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuário sencontrados com sucesso.',
    schema: {
      example: {
        users: [
          {
            id: '12345-abcde',
            name: 'Maria Silva',
            fullName: 'Maria Aparecida Silva',
            email: 'maria.silva@example.com',
            password: 'asdhigqedhskhdbashdgaskd',
            cpf: '123.456.789-00',
            position: 'user',
            photoUrl: 'https://example.com/photo.jpg',
          }
        ]
      }
    },
  })
  
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub;

    const users = await this.prisma.user.findMany({
      where: { id: { not: userId }}
    })
    return users
  }
}
