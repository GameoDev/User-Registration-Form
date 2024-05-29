const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export async function POST(req, res) {
  try {
    const { orderId, prices, product_ids, product_quantity } = await req.json();

    let Order = await prisma.orderedProdcuts.create({
      data: {
        orderId,
        prices,
        product_ids,
        product_quantity,
      },
    });

    return Response.json(Order);
  } catch (error) {
    return Response.json(error.message);
  }
}
