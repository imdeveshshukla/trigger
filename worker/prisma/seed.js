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
  // const emailTrigger = await prisma.availableTrigger.create({
  //   data: { name: "Email",img:"https://cdn.imgbin.com/2/20/10/imgbin-gmail-email-computer-icons-google-logo-gmail-hpibJEXfpsUbqciFff9cRzHss.jpg" }
  // })

  const hookTrigger = await prisma.availableTrigger.create({
    data: { name: "Hook",img:"https://i.sstatic.net/S3SNU.jpg" }
  })

  const whatsAppAction = await prisma.availableAction.create({
    data: { name: "Whatsapp",img:"https://lookaside.fbsbx.com/elementpath/media/?media_id=595945097590761&version=1749126188&transcode_extension=webp" }
  })

  const rzpAction = await prisma.availableAction.create({
    data: { name: "Razorpay-link",img:"https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2024/05/Razorpay-Logo.jpg" }
  }) 

  const emailAction = await prisma.availableAction.create({
    data: { name: "Email",img:"https://cdn.imgbin.com/2/20/10/imgbin-gmail-email-computer-icons-google-logo-gmail-hpibJEXfpsUbqciFff9cRzHss.jpg" }
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
