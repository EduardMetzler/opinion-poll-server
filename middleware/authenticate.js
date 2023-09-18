import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const secretKey = process.env.SECRETKEY;
  try {
    // const token = req.cookies.token;
    const token = req.body.token;

    if (!token) {
      return res.status(500).json({ msg: "server error, no token" });
    }
    const decode = await jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie("token");
    return res.status(500).json({ msg: "server error" });
  }
};
