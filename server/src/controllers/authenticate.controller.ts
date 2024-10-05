import { Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@ApiTags('Authenticate')
@Controller('/sessions')

export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  
  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @ApiOperation({ summary: 'Autentica um usuário com CPF e senha' })
  @ApiBody({ schema: { example: { cpf: '12345678900', password: '123456' } } })
  @ApiResponse({
    status: 200,
    description: 'Autenticação bem-sucedida. Retorna o token de acesso.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmY2UzZjk3NS01OTJhLTQwNzMtOTJlMi1jYjQyNDgwM2QzODQiLCJpYXQiOjE3MjgxNDE5Mzh9.hBySLNYgC1geksTeu9-tFpLt3hN1Ynhc-fh-LP_0-FGYkMpdcp9dTXZdSqlBZ6J_Cuj76HgcuXVLt4y7uPfdH5Vn7ZSuwTKmVcy9xMIzzH8r-I10nUk-5HC7G1OCUzHNXR_pMPF-oYsugr_ooQWL28DyXm_QSn_kw8VNZQumnScTgksIrLzPvmDqV_JEIFgc6eC5x6tiR0Gf8Vm7DvbZSiLh2j8SmW_j0G10R0t-_297y8Tp3WkrqVKDnY6yl580Uqvf-XC6xKfju_oPHtVeHgaQnA3PDnSYPsCYk_KLhnBVvu8cULt1zSQ4jAGeexID_Tft4lOJ3zJKdHilP-D3sA'
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Falha na autenticação. Credenciais inválidas.'
  })
  
  async handle(@Body() body: AuthenticateBodySchema) {
    const { cpf, password } = body

    const user = await this.prisma.user.findUnique({
      where: { cpf }
    })
    if (!user) {
      throw new UnauthorizedException('As credenciais do usuário não correspondem.')
    }
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('As credenciais do usuário não correspondem.')
    }
    const accessToken = this.jwt.sign({ sub: user.id })
    return {
      access_token: accessToken,
    }
  }
}