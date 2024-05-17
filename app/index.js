const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.create({
  //   data: {
  //     Name: "Alice",
  //     email: "alice@prisma.ioeer",
  //     Password: "hello123",
  //   },
  // });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    console.log("done");
  })
  .catch(async (e) => {
    console.log("not done");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
