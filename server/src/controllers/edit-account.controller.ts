import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, Put, UseGuards } from '@nestjs/common'
import { hash } from 'bcryptjs'
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
  password: z.string(),
  cpf: z.string(),
  position: z.string(),
  photoUrl: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)
type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>

@Controller('/accounts/:id')
@UseGuards(JwtAuthGuard)

export class EditAccountController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(204)
  
  async handle(
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') accountId: string,
  ) {
    const { name, fullName, email, password, cpf, position, photoUrl } = body
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

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await hash(password, 8)
    }

    await this.prisma.user.update({
      where: { id: accountId },
      data: {
        name,
        fullName,
        email,
        cpf,
        position,
        photoUrl,
        ...(hashedPassword && { password: hashedPassword }),
      }
    })
    
  }
}