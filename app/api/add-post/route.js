const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { title, description, avatar, price, published } = await req.json();

    let post = await prisma.products.create({
      data: {
        title,
        description,
        avatar,
        price,
        published,
      },
    });

    return Response.json("New Product added");
  } catch (error) {
    console.error(error);
    return Response.json(error.message);
  }
}
