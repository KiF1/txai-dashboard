import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { compare, hash } from 'bcryptjs'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'

const editAccountBodySchema = z.object({
  name: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  position: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)
type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>

@ApiTags('Accounts')
@Controller('/accounts/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()

export class EditAccountController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(204)
  @ApiOperation({ summary: 'Edita uma conta de usuário' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da conta a ser editada',
    example: '12345abcde',
  }) 
  @ApiBody({
    schema: {
      example: {
        name: 'Maria Silva',
        fullName: 'Maria Aparecida Silva',
        email: 'maria.silva@example.com',
        position: 'Gerente de Projetos',
      },
    },
  })
  @ApiResponse({
    status: 204,
    description: 'Conta editada com sucesso. Nenhuma resposta é retornada.',
  }) 
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado ou sem permissão.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Usuário não encontrado.',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito. Já existe um usuário com o mesmo e-mail.',
    schema: {
      example: {
        statusCode: 409,
        message: 'Já existe um usuário com o mesmo endereço de e-mail.',
      },
    },
  })
  
  async handle(
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') accountId: string,
  ) {
    const { name, fullName, email, position } = body
    const userId = user.sub

    const userLogged = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userLogged) {
      throw new BadRequestException('Usuário não encontrado.')
    }

    if (userId !== accountId && userLogged.position !== 'admin') {
      throw new BadRequestException('Você não tem permissão para editar esta conta.')
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    
    if (userWithSameEmail && userWithSameEmail.id !== accountId) {
      throw new ConflictException('Já existe um usuário com o mesmo endereço de e-mail.')
    }

    await this.prisma.user.update({
      where: { id: accountId },
      data: {
        name,
        fullName,
        email,
        position
      }
    })
    
  }
}