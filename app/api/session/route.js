import { verifyToken } from "@/utils/jwt";

export async function GET(req, res) {
  const authHeader = req.headers.get("authorization");
  console.log("Authorization header:", authHeader); // Debugging

  if (!authHeader) {
    console.error("Authorization header missing"); // Debugging
    return new Response(
      JSON.stringify({
        authenticated: false,
        message: "Authorization header missing",
      }),
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token); // Debugging

  const decoded = verifyToken(token);
  console.log("Decoded token:", decoded); // Debugging

  if (decoded) {
    return new Response(JSON.stringify({ authenticated: true }), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({ authenticated: false, message: "Invalid token" }),
      { status: 401 }
    );
  }
}
