import { verifyToken } from "@/utils/jwt";

export default function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ authenticated: false });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (decoded) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
}
