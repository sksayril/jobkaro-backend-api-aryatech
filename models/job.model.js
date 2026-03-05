let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    JobTitle: {
        type: String,
        require: true
    },
    CompanyName: {
        type: String,
        require: true
    },
    CompanyLogo: {
        type: String, // URL or base64
        default: ''
    },
    JobImage: {
        type: String, // URL or base64
        default: ''
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true
    },
    Salary: {
        min: {
            type: String,
            default: ''
        },
        max: {
            type: String,
            default: ''
        }
    },
    Experience: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        }
    },
    Location: {
        type: String,
        default: ''
    },
    JobType: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Contract', 'Internship'],
        default: 'Full Time'
    },
    WorkMode: {
        type: String,
        enum: ['On-site', 'Remote', 'Hybrid'],
        default: 'On-site'
    },
    HiringStatus: {
        type: String,
        enum: ['Actively Hiring', 'Not Hiring', 'Closed'],
        default: 'Actively Hiring'
    },
    CompanyVerified: {
        type: Boolean,
        default: false
    },
    MatchPercentage: {
        type: Number,
        default: 0
    },
    AboutCompany: {
        type: String,
        default: ''
    },
    JobDescription: {
        type: [String], // Array of bullet points
        default: []
    },
    RequiredSkills: {
        type: [String], // Array of skills
        default: []
    },
    InterviewProcess: [{
        step: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        duration: {
            type: String,
            default: ''
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isTrending: {
        type: Boolean,
        default: false
    },
    ApplyURL: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('job', schema)
