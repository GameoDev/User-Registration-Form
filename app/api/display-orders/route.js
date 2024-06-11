const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const orders = await prisma.orders.findMany({
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
    return res.status(500).json({ error: error.message });
  }
}
