const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const {
      customer_name,
      customer_address,
      customer_mobile,
      customer_city,
      customer_email,
    } = await req.json();

    let Order = await prisma.orders.create({
      data: {
        customer_name,
        customer_address,
        customer_mobile,
        customer_city,
        customer_email,
      },
    });

    return Response.json(Order);
  } catch (error) {
    return Response.json(error.message);
  }
}

export async function AddOrder(req, res) {
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
