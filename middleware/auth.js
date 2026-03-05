const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No token provided."
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );
    
    // Attach admin info to request
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or Expired Token",
      error: err.message
    });
  }
};

module.exports = authenticateToken;
