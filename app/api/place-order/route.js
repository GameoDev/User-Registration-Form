const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { userId } = await req.json();

    const newOrder = await prisma.orders.create({
      data: {
        userId: userId, // Associate the order with the user by userId
        orderedTime: new Date(),
      },
    });

    return Response.json(newOrder);
  } catch (error) {
    return Response.json(error.message);
  }
}

export async function AddOrder(req, res) {
  try {
    const { orderId, productId, product_quantity } = await req.json();

    let Order = await prisma.orderedProdcuts.create({
      data: {
        orderId: orderId, // Ensuring ordersId exists in the orders table
        productId: productId,
        product_quantity: product_quantity,
        order: {
          connect: {
            id: orderId,
          },
        },
      },
    });

    return Response.json(Order);
  } catch (error) {
    return Response.json(error.message);
  }
}
