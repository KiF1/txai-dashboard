import { NotFoundException, Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/services/prisma.service'

@ApiTags('Accounts')
@Controller('/accounts/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class FetchAccountController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca uma conta de usuário pelo ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da conta a ser buscada',
    example: '12345-abcde',
  }) 
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso.',
    schema: {
      example: {
        id: '12345-abcde',
        name: 'Maria Silva',
        fullName: 'Maria Aparecida Silva',
        email: 'maria.silva@example.com',
        password: 'asdhigqedhskhdbashdgaskd',
        cpf: '123.456.789-00',
        position: 'admin',
        photoUrl: 'https://example.com/photo.jpg',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado.',
      },
    },
  })
  
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
