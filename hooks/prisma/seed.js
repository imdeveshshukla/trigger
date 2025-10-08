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

  const rzpLink = await prisma.availableAction.create({
    data: { name: "Razorpay-Link" }
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
