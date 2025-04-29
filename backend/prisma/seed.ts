import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

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

  const positionList = [
    'Gerente',
    'Almoxarife',
    'Usuario padrão'
  ]

  for (const name of positionList) {
    await prisma.position.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  // Buscar o ID da posição 'Gerente'
  const gerentePosition = await prisma.position.findUnique({
    where: { name: 'Gerente' }
  })

  if (!gerentePosition) {
    throw new Error('Posição "Gerente" não encontrada')
  }
  const password = "1"
  const hashedPassword = await bcrypt.hash(password, 10); // criptografia da senha 

  // Criar o usuário admin
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      user: "admin",
      positionId: gerentePosition.id,
      password: hashedPassword,
    }
  })

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
