var express = require('express');
var router = express.Router();
const authenticateToken = require('../middleware/auth');

let jobModel = require('../models/job.model')
let categoryModel = require('../models/category.model')

// Create Job (Protected Route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    let {
      JobTitle,
      CompanyName,
      CompanyLogo,
      JobImage,
      Category,
      Salary,
      Experience,
      Location,
      JobType,
      WorkMode,
      HiringStatus,
      CompanyVerified,
      MatchPercentage,
      AboutCompany,
      JobDescription,
      RequiredSkills,
      InterviewProcess,
      isActive,
      isTrending,
      ApplyURL
    } = req.body

    // Validate required fields (only essential fields)
    if (!JobTitle || !CompanyName || !Category) {
      return res.status(400).json({
        message: "JobTitle, CompanyName, and Category are required"
      })
    }

    // Validate Category exists
    let category = await categoryModel.findById(Category)
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    let job_data = await jobModel.create({
      JobTitle,
      CompanyName,
      CompanyLogo: CompanyLogo || '',
      JobImage: JobImage || '',
      Category,
      Salary: Salary ? {
        min: Salary.min || '',
        max: Salary.max || ''
      } : {
        min: '',
        max: ''
      },
      Experience: Experience ? {
        min: Experience.min !== undefined ? Experience.min : 0,
        max: Experience.max !== undefined ? Experience.max : 0
      } : {
        min: 0,
        max: 0
      },
      Location: Location || '',
      JobType: JobType || 'Full Time',
      WorkMode: WorkMode || 'On-site',
      HiringStatus: HiringStatus || 'Actively Hiring',
      CompanyVerified: CompanyVerified || false,
      MatchPercentage: MatchPercentage || 0,
      AboutCompany: AboutCompany || '',
      JobDescription: JobDescription ? (Array.isArray(JobDescription) ? JobDescription : [JobDescription]) : [],
      RequiredSkills: RequiredSkills ? (Array.isArray(RequiredSkills) ? RequiredSkills : [RequiredSkills]) : [],
      InterviewProcess: InterviewProcess || [],
      isActive: isActive !== undefined ? isActive : true,
      isTrending: isTrending !== undefined ? isTrending : false,
      ApplyURL: ApplyURL || ''
    })

    // Populate category in response
    await job_data.populate('Category')

    return res.status(201).json({
      message: "Job Created Successfully",
      data: job_data
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Get All Jobs (Protected Route)
router.get('/', authenticateToken, async (req, res) => {
  try {
    let jobs = await jobModel.find()
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })

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

// Get Active Jobs Only (Protected Route)
router.get('/active/list', authenticateToken, async (req, res) => {
  try {
    let jobs = await jobModel.find({ isActive: true })
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })

    return res.json({
      message: "Active Jobs Retrieved Successfully",
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

// Get Jobs by Category (Protected Route)
router.get('/category/:categoryId', authenticateToken, async (req, res) => {
  try {
    let categoryId = req.params.categoryId

    // Validate category exists
    let category = await categoryModel.findById(categoryId)
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    let jobs = await jobModel.find({ Category: categoryId, isActive: true })
      .populate('Category', 'CategoryName CategoryEmoji')
      .sort({ createdAt: -1 })

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

// Get Single Job by ID (Protected Route)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    let job = await jobModel.findById(req.params.id)
      .populate('Category', 'CategoryName CategoryEmoji')

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
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

// Update Job (Protected Route)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    let job = await jobModel.findById(req.params.id)
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
      })
    }

    let {
      JobTitle,
      CompanyName,
      CompanyLogo,
      JobImage,
      Category,
      Salary,
      Experience,
      Location,
      JobType,
      WorkMode,
      HiringStatus,
      CompanyVerified,
      MatchPercentage,
      AboutCompany,
      JobDescription,
      RequiredSkills,
      InterviewProcess,
      isActive,
      isTrending,
      ApplyURL
    } = req.body

    // Validate Category if provided
    if (Category) {
      let category = await categoryModel.findById(Category)
      if (!category) {
        return res.status(404).json({
          message: "Category Not Found"
        })
      }
      job.Category = Category
    }

    // Update fields
    if (JobTitle) job.JobTitle = JobTitle
    if (CompanyName) job.CompanyName = CompanyName
    if (CompanyLogo !== undefined) job.CompanyLogo = CompanyLogo
    if (JobImage !== undefined) job.JobImage = JobImage
    if (Location) job.Location = Location
    if (JobType) job.JobType = JobType
    if (WorkMode) job.WorkMode = WorkMode
    if (HiringStatus) job.HiringStatus = HiringStatus
    if (CompanyVerified !== undefined) job.CompanyVerified = CompanyVerified
    if (MatchPercentage !== undefined) job.MatchPercentage = MatchPercentage
    if (AboutCompany) job.AboutCompany = AboutCompany
    if (JobDescription) job.JobDescription = Array.isArray(JobDescription) ? JobDescription : [JobDescription]
    if (RequiredSkills) job.RequiredSkills = Array.isArray(RequiredSkills) ? RequiredSkills : [RequiredSkills]
    if (InterviewProcess) job.InterviewProcess = InterviewProcess
    if (isActive !== undefined) job.isActive = isActive
    if (isTrending !== undefined) job.isTrending = isTrending
    if (ApplyURL !== undefined) job.ApplyURL = ApplyURL

    // Update Salary if provided
    if (Salary) {
      if (Salary.min) job.Salary.min = Salary.min
      if (Salary.max) job.Salary.max = Salary.max
    }

    // Update Experience if provided
    if (Experience) {
      if (Experience.min !== undefined) job.Experience.min = Experience.min
      if (Experience.max !== undefined) job.Experience.max = Experience.max
    }

    let updatedJob = await job.save()
    await updatedJob.populate('Category', 'CategoryName CategoryEmoji')

    return res.json({
      message: "Job Updated Successfully",
      data: updatedJob
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Update Job Status (Active/Deactive) (Protected Route)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    let { isActive } = req.body

    if (isActive === undefined) {
      return res.status(400).json({
        message: "isActive status is required"
      })
    }

    let job = await jobModel.findById(req.params.id)
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
      })
    }

    job.isActive = isActive
    let updatedJob = await job.save()
    await updatedJob.populate('Category', 'CategoryName CategoryEmoji')

    return res.json({
      message: `Job ${isActive ? 'Activated' : 'Deactivated'} Successfully`,
      data: updatedJob
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Assign/Update Category to Job (Protected Route)
router.put('/:id/category', authenticateToken, async (req, res) => {
  try {
    let { Category } = req.body

    if (!Category) {
      return res.status(400).json({
        message: "Category is required"
      })
    }

    let job = await jobModel.findById(req.params.id)
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
      })
    }

    // Validate Category exists
    let category = await categoryModel.findById(Category)
    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      })
    }

    job.Category = Category
    let updatedJob = await job.save()
    await updatedJob.populate('Category', 'CategoryName CategoryEmoji')

    return res.json({
      message: "Category Assigned Successfully",
      data: updatedJob
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

// Delete Job (Protected Route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    let job = await jobModel.findByIdAndDelete(req.params.id)

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
      })
    }

    return res.json({
      message: "Job Deleted Successfully",
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
