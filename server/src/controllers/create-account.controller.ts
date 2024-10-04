import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  cpf: z.string(),
  position: z.string(),
  photoUrl: z.string(),
})
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))

  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, cpf, fullName, photoUrl, position } = body
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
    })
    if (userWithSameEmail) {
      throw new ConflictException(
        'Já existe um usuário com o mesmo endereço de e-mail.',
      )
    }
    
    const hashedPassword = await hash(password, 8)
    
    await this.prisma.user.create({ data: { name, email, password: hashedPassword, cpf, fullName, photoUrl, position }})
  }
}