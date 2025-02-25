const jwt = require("jsonwebtoken");
const privateKey = "Sanddy@123";

function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }
    const jwtToken = token.split(" ")[1];
    const decodeToken = jwt.verify(jwtToken, privateKey);

    if (decodeToken) {
      req.username=decodeToken.username
      next();
    } else {
      res.status(401).json({
        message: "Authentication Failed",
        success: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid or Expired Token",
      success: false,
      error: error.message,
    });
  }
}

module.exports = userMiddleware;





module.exports = userMiddleware;
