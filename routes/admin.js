var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

let adminModel = require('../models/admin.model')

// Admin Signup API
router.post('/signup', async (req, res) => {
  try {
    let { Email, Password } = req.body
    
    if (!Email || !Password) {
      return res.status(400).json({
        message: "Email and Password are required"
      })
    }

    let checkAdmin = await adminModel.find({ Email: Email })
    if (checkAdmin.length > 0) {
      return res.json({
        message: "Admin Already Exist"
      })
    }
    else {
      let admin_data = await adminModel.create({ Email: Email, Password: Password })
      return res.json({
        message: "Admin Created Successfully",
        data: admin_data
      })
    }

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Admin Login API
router.post('/login', async (req, res) => {
  try {
    let { Email, Password } = req.body
    
    if (!Email || !Password) {
      return res.status(400).json({
        message: "Email and Password are required"
      })
    }

    let admin = await adminModel.findOne({ Email: Email })
    if (!admin) {
      return res.status(404).json({
        message: "Admin Not Found"
      })
    }

    if (admin.Password !== Password) {
      return res.status(401).json({
        message: "Invalid Password"
      })
    }

    // Generate JWT Token
    const token = jwt.sign(
      { 
        id: admin._id,
        Email: admin.Email 
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    )

    return res.json({
      message: "Login Successful",
      token: token,
      data: {
        Email: admin.Email,
        id: admin._id
      }
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Example: Protected Route (requires JWT token)
// Uncomment to use this protected route
// router.get('/profile', authenticateToken, async (req, res) => {
//   try {
//     // req.admin contains the decoded token data (id, Email)
//     const admin = await adminModel.findById(req.admin.id).select('-Password');
//     if (!admin) {
//       return res.status(404).json({ message: "Admin Not Found" });
//     }
//     return res.json({
//       message: "Admin Profile",
//       data: admin
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message
//     });
//   }
// });

module.exports = router;
