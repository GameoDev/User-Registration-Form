const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function POST(req, res) {
  try {
    const { email, Password, Name } = req.body;

    console.log("checking for", email);

    let userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res
        .status(200)
        .json({ action: "failed", message: "This email is already taken" });
    }

    // let token = "klsjflksdjf ldksf dlskf ds";

    // let emailToken = uuid.v4();

    let user = await prisma.user.create({
      data: {
        email,
        Password,
        Name,
      },
    });

    return res.status(200).json({
      action: "success",
      message:
        "We have sent an email with a verification link to your email account.",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      action: "failed",
      message: "Internal server error1233",
      error: error.message,
    });
  }
}
