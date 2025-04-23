import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const statusList = [
    'Novo',
    'Iniciado',
    'Entregue',
    'Não devolvido',
    'Finalizado',
    'Cancelado',
  ]

  for (const name of statusList) {
    await prisma.status.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
