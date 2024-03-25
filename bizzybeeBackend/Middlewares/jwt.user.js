const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid token format");
    }

    const jwtToken = tokenParts[1];
    const decoded = jwt.verify(jwtToken, process.env.ACCESS_USERTOKEN_SECRET);

    if (decoded) {
      res.token = decoded.id;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
