const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function POST(req, res) {
  try {
    const { email, Password } = req.body;

    console.log("checking for", email);

    let userExists = await prisma.user.findFirst({
      where: {
        email: email,
        Password: Password,
      },
    });

    if (userExists) {
      return res.status(200).json({
        action: "success",
        message: "You Are Logged In Your Account",
        data: {},
      });
    }

    // let token = "klsjflksdjf ldksf dlskf ds";

    // let emailToken = uuid.v4();
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      action: "failed",
      message: "Internal server error1233",
      error: error.message,
    });
  }
}
