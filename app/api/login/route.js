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
      const token = generateToken({ email });
      return new Response(
        JSON.stringify({ success: "Successful", token: token }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}
