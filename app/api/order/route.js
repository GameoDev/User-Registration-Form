const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { userId } = await req.json();
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true, // Include user details
        orderedProdcuts: {
          include: {
            product: true, // Include product details for each ordered product
          },
        },
      },
    });
    return Response.json(orders);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
