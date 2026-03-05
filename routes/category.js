var express = require('express');
var router = express.Router();
const authenticateToken = require('../middleware/auth');

let categoryModel = require('../models/category.model')

// Create Category (Protected Route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    let { CategoryName, CategoryEmoji, isActive } = req.body

    if (!CategoryName || !CategoryEmoji) {
      return res.status(400).json({
        message: "CategoryName and CategoryEmoji are required"
      })
    }

    // Check if category already exists
    let checkCategory = await categoryModel.findOne({ CategoryName: CategoryName })
    if (checkCategory) {
      return res.status(400).json({
        message: "Category Already Exist"
      })
    }

    let category_data = await categoryModel.create({
      CategoryName: CategoryName,
      CategoryEmoji: CategoryEmoji,
      isActive: isActive !== undefined ? isActive : true
    })

    return res.status(201).json({
      message: "Category Created Successfully",
      data: category_data
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get All Categories (Protected Route)
router.get('/', authenticateToken, async (req, res) => {
  try {
    let categories = await categoryModel.find().sort({ createdAt: -1 })
    
    return res.json({
      message: "Categories Retrieved Successfully",
      count: categories.length,
      data: categories
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get Active Categories Only (Protected Route)
router.get('/active/list', authenticateToken, async (req, res) => {
  try {
    let categories = await categoryModel.find({ isActive: true }).sort({ createdAt: -1 })
    
    return res.json({
      message: "Active Categories Retrieved Successfully",
      count: categories.length,
      data: categories
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get Single Category by ID (Protected Route)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    let category = await categoryModel.findById(req.params.id)
    
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    return res.json({
      message: "Category Retrieved Successfully",
      data: category
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Update Category (Protected Route)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    let { CategoryName, CategoryEmoji, isActive } = req.body

    let category = await categoryModel.findById(req.params.id)
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    // Check if category name already exists (excluding current category)
    if (CategoryName && CategoryName !== category.CategoryName) {
      let checkCategory = await categoryModel.findOne({ CategoryName: CategoryName })
      if (checkCategory) {
        return res.status(400).json({
          message: "Category Name Already Exist"
        })
      }
    }

    // Update fields
    if (CategoryName) category.CategoryName = CategoryName
    if (CategoryEmoji) category.CategoryEmoji = CategoryEmoji
    if (isActive !== undefined) category.isActive = isActive

    let updatedCategory = await category.save()

    return res.json({
      message: "Category Updated Successfully",
      data: updatedCategory
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Update Category Status (Active/Deactive) (Protected Route)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    let { isActive } = req.body

    if (isActive === undefined) {
      return res.status(400).json({
        message: "isActive status is required"
      })
    }

    let category = await categoryModel.findById(req.params.id)
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    category.isActive = isActive
    let updatedCategory = await category.save()

    return res.json({
      message: `Category ${isActive ? 'Activated' : 'Deactivated'} Successfully`,
      data: updatedCategory
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Delete Category (Protected Route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    let category = await categoryModel.findByIdAndDelete(req.params.id)
    
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    return res.json({
      message: "Category Deleted Successfully",
      data: category
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

module.exports = router;
