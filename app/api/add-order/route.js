const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export async function POST(req, res) {
  try {
    const { orderId, productId, product_quantity, orderedTime } =
      await req.json();

    let Order = await prisma.orderedProdcuts.create({
      data: {
        orderId: orderId, // Ensuring ordersId exists in the orders table
        productId: productId,
        product_quantity: product_quantity,
      },
    });

    return Response.json(Order);
  } catch (error) {
    return Response.json(error.message);
  }
}
