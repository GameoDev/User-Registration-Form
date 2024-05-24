const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { email, Password } = await req.json();

    let userExists = await prisma.user.findFirst({
      where: {
        email: email,
        Password: Password,
      },
    });

    if (userExists) {
      return Response.json("You are logged in Your Account");
    }
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}
