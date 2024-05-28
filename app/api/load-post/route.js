const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    //const posts = await prisma.posts.findMany();
    const post = await prisma.posts.findUnique({
      where: {
        id: 3, // Ensure id is an integer
      },
    });
    return Response.json(post);
  } catch (error) {
    return Response.json(error.message);
  }
}
