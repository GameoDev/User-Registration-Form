const nodemailer = require("nodemailer");

export async function POST(req, res) {
  if (req.method === "POST") {
    let body = await req.json();
    const { to, subject, text } = body;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    try {
      console.log("Subject:", subject);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      });
      return Response.json("email sent successfull");
    } catch (error) {
      return Response.json(error.message);
    }
  } else {
    return Response.json(error.message);
  }
}
