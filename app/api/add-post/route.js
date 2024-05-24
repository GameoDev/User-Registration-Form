const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { title, description, avatar, published } = await req.json();

    let post = await prisma.posts.create({
      data: {
        title,
        description,
        avatar,
        published,
      },
    });

    return Response.json("User added");
  } catch (error) {
    console.error(error);
    return Response.json(error.message);
  }
}
