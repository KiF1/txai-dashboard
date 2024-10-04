import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'

const createProductBodySchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
})
const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@Controller('/products')
@UseGuards(JwtAuthGuard)

export class CreateProductController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)

  async handle(
    @Body(bodyValidationPipe) body: CreateProductBodySchema, @CurrentUser() user: UserPayload) {
    const { name, price, quantity, createdAt } = body
    const userId = user.sub

    await this.prisma.product.create({
      data: {
        creatorId: userId,
        name,
        price,
        quantity,
        createdAt
      },
    })
  }
}