const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { id, status } = await req.json();

    const updatedOrder = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return Response.json(updatedOrder); // Use res.json to send the response
  } catch (error) {
    return Response.json({ error: error.message }); // Ensure proper status code and error message
  }
}
