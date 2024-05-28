const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const posts = await prisma.posts.findMany();
    return Response.json(posts);
  } catch (error) {
    return Response.json(error.message);
  }
}
