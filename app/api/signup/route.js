const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    // const { email, Password, Name, isAdmin } = await req.json();
    const { email, Password, Name, privacy } = await req.json();

    let userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return Response.json("user already defined");
    }

    // let user = await prisma.user.create({
    //   data: {
    //     email,
    //     Password,
    //     Name,
    //     isAdmin,
    //   },
    // });

    let user = await prisma.user.create({
      data: {
        email,
        Password,
        Name,
        privacy,
      },
    });

    return Response.json("USer added");
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}
