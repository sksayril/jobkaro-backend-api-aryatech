var express = require('express');
var router = express.Router();

let categoryModel = require('../models/category.model')
let jobModel = require('../models/job.model')

// Get All Active Categories (Public - No Authentication Required)
router.get('/categories', async (req, res) => {
  try {
    let categories = await categoryModel.find({ isActive: true }).sort({ createdAt: -1 })
    
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

// Get Single Category by ID (Public - No Authentication Required)
router.get('/categories/:id', async (req, res) => {
  try {
    let category = await categoryModel.findOne({ _id: req.params.id, isActive: true })
    
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found or Inactive"
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

// Get Active Jobs (Public - No Authentication Required)
router.get('/jobs', async (req, res) => {
  try {
    let jobs = await jobModel.find({ isActive: true })
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })
      .limit(50) // Limit to 50 jobs for public API

    return res.json({
      message: "Jobs Retrieved Successfully",
      count: jobs.length,
      data: jobs
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get Jobs by Category (Public - No Authentication Required)
// Supports pagination with query parameters: page (default: 1), limit (default: 10, max: 10)
router.get('/jobs/category/:categoryId', async (req, res) => {
  try {
    let categoryId = req.params.categoryId

    // Validate category exists and is active
    let category = await categoryModel.findOne({ _id: categoryId, isActive: true })
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found or Inactive"
      })
    }

    // Pagination parameters
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    
    // Ensure limit doesn't exceed 10
    if (limit > 10) limit = 10
    if (page < 1) page = 1
    
    // Calculate skip value
    let skip = (page - 1) * limit

    // Get total count for pagination metadata
    let totalJobs = await jobModel.countDocuments({ Category: categoryId, isActive: true })
    let totalPages = Math.ceil(totalJobs / limit)

    // Get paginated jobs
    let jobs = await jobModel.find({ Category: categoryId, isActive: true })
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return res.json({
      message: "Jobs Retrieved Successfully",
      count: jobs.length,
      totalJobs: totalJobs,
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      data: jobs
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get Trending Jobs (Public - No Authentication Required)
router.get('/jobs/trending', async (req, res) => {
  try {
    let jobs = await jobModel.find({ isActive: true, isTrending: true })
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })
      .limit(20) // Limit to 20 trending jobs

    return res.json({
      message: "Trending Jobs Retrieved Successfully",
      count: jobs.length,
      data: jobs
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get Latest Jobs (Public - No Authentication Required)
// Returns top 10 latest jobs based on creation date
router.get('/jobs/latest', async (req, res) => {
  try {
    let jobs = await jobModel.find({ isActive: true })
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 }) // Sort by creation date descending (newest first)
      .limit(10) // Limit to top 10 latest jobs

    return res.json({
      message: "Latest Jobs Retrieved Successfully",
      count: jobs.length,
      data: jobs
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Search Jobs (Public - No Authentication Required)
// Supports searching by job title, company name, location, and skills
// Supports pagination with query parameters: page (default: 1), limit (default: 10, max: 10)
router.get('/jobs/search', async (req, res) => {
  try {
    let { q, title, company, location, skill, page, limit } = req.query

    // Build search query
    let searchQuery = { isActive: true }
    let andConditions = []

    // General search query (searches in multiple fields with OR)
    if (q && q.trim() !== '') {
      let searchTerm = q.trim()
      let orConditions = [
        { JobTitle: { $regex: searchTerm, $options: 'i' } },
        { CompanyName: { $regex: searchTerm, $options: 'i' } },
        { Location: { $regex: searchTerm, $options: 'i' } },
        { RequiredSkills: { $in: [new RegExp(searchTerm, 'i')] } }
      ]
      andConditions.push({ $or: orConditions })
    }

    // Specific field searches (these are ANDed together)
    // Note: If both 'q' and specific fields are provided, they work together with AND logic
    if (title && title.trim() !== '') {
      searchQuery.JobTitle = { $regex: title.trim(), $options: 'i' }
    }

    if (company && company.trim() !== '') {
      searchQuery.CompanyName = { $regex: company.trim(), $options: 'i' }
    }

    if (location && location.trim() !== '') {
      searchQuery.Location = { $regex: location.trim(), $options: 'i' }
    }

    if (skill && skill.trim() !== '') {
      searchQuery.RequiredSkills = { $in: [new RegExp(skill.trim(), 'i')] }
    }

    // Combine conditions properly
    if (andConditions.length > 0) {
      // General search (q) exists
      if (Object.keys(searchQuery).length > 1) {
        // Both general search and specific fields exist
        // Add specific field conditions to AND array
        let specificFields = { ...searchQuery }
        delete specificFields.isActive
        if (Object.keys(specificFields).length > 0) {
          andConditions.push(specificFields)
        }
        searchQuery = { isActive: true, $and: andConditions }
      } else {
        // Only general search (q), no specific fields
        searchQuery.$or = andConditions[0].$or
      }
    }
    // If no general search (q), searchQuery already has specific fields or is just { isActive: true }

    // Pagination parameters
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10
    
    // Ensure limit doesn't exceed 10
    if (limit > 10) limit = 10
    if (page < 1) page = 1
    
    // Calculate skip value
    let skip = (page - 1) * limit

    // Get total count for pagination metadata
    let totalJobs = await jobModel.countDocuments(searchQuery)
    let totalPages = Math.ceil(totalJobs / limit)

    // Get paginated search results
    let jobs = await jobModel.find(searchQuery)
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return res.json({
      message: "Jobs Search Completed Successfully",
      count: jobs.length,
      totalJobs: totalJobs,
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      searchQuery: {
        q: q || null,
        title: title || null,
        company: company || null,
        location: location || null,
        skill: skill || null
      },
      data: jobs
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get Single Job by ID (Public - No Authentication Required)
router.get('/jobs/:id', async (req, res) => {
  try {
    let job = await jobModel.findOne({ _id: req.params.id, isActive: true })
      .populate('Category', 'CategoryName CategoryEmoji')

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found or Inactive"
      })
    }

    return res.json({
      message: "Job Retrieved Successfully",
      data: job
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

module.exports = router;
