import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

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

@ApiTags('Accounts')
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @ApiOperation({ summary: 'Cria uma nova conta de usuário' })
  @ApiBody({
    schema: {
      example: {
        name: 'João Silva',
        fullName: 'João da Silva Pereira',
        email: 'joao.silva@example.com',
        password: 'senha123',
        cpf: '12345678900',
        position: 'Desenvolvedor',
        photoUrl: 'http://example.com/photo.jpg',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Conta criada com sucesso. Nenhuma resposta é retornada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito. Já existe um usuário com o mesmo endereço de e-mail.',
    schema: {
      example: {
        statusCode: 409,
        message: 'Já existe um usuário com o mesmo endereço de e-mail.',
      },
    },
  })

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