import { BadRequestException, Body, Controller, HttpCode, Param, Put, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'

const editProductBodySchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema)
type EditProductBodySchema = z.infer<typeof editProductBodySchema>

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)

export class EditProductController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(204)
  
  async handle(
    @Body(bodyValidationPipe) body: EditProductBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') productId: string,
  ) {
    const { name, price, quantity, createdAt } = body
    const userId = user.sub

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new BadRequestException('Produto Não encontrado')
    }

    if (product.creatorId !== userId) {
      throw new BadRequestException('Você não tem permissão para editar este produto.')
    }

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        creatorId: userId,
        name,
        price,
        quantity,
        createdAt,
      }
    })
    
  }
}