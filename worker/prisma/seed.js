import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.runningOutbox.deleteMany()
  await prisma.running.deleteMany()
  await prisma.action.deleteMany()
  await prisma.trigger.deleteMany()
  await prisma.user.deleteMany()
  await prisma.availableAction.deleteMany()
  await prisma.availableTrigger.deleteMany()

  // Create available triggers and actions
  const emailTrigger = await prisma.availableTrigger.create({
    data: { name: "Email" }
  })

  const hookTrigger = await prisma.availableTrigger.create({
    data: { name: "Hook" }
  })

  const whatsAppAction = await prisma.availableAction.create({
    data: { name: "Whatsapp" }
  })

  const emailAction = await prisma.availableAction.create({
    data: { name: "Email" }
  })

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: "hashedpassword1",
    }
  })


  // Create a trigger for Alice
  const aliceTrigger = await prisma.trigger.create({
    data: {
      zapId: "zap-123",
      triggerId: hookTrigger.id,
      userId: user1.id,
    }
  })

  // Create actions for Alice’s trigger
  await prisma.action.createMany({
    data: [
      {
        zapId: aliceTrigger.id,
        actionId: emailAction.id,
        params: { to: "to", subject: "subject", body: "body" },
        sortingOrder: 0,
      },
      {
        zapId: aliceTrigger.id,
        actionId: whatsAppAction.id,
        params: { message: "message", phone: "phone" },
        sortingOrder: 1,
      },
    ]
  })
  console.log("🌱 Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
