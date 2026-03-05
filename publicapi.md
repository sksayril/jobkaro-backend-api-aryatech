# Public API Documentation

This document provides comprehensive documentation for the Public API endpoints. These endpoints do **NOT** require authentication and can be accessed by anyone.

## Base URL

All public endpoints are prefixed with `/api`

## Authentication

**No authentication required** - All endpoints in this documentation are publicly accessible.

---

## Endpoints

### 1. Get All Active Categories

Retrieve all active job categories. **No Authentication Required.**

**Endpoint:** `GET /api/categories`

**Success Response (200 OK):**
```json
{
  "message": "Categories Retrieved Successfully",
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "CategoryName": "Software Development",
      "CategoryEmoji": "💻",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "CategoryName": "Design",
      "CategoryEmoji": "🎨",
      "isActive": true,
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

**Note:** Only active categories are returned. Inactive categories are filtered out.

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/categories
```

**JavaScript Example:**
```javascript
fetch('http://localhost:3000/api/categories')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

---

### 2. Get Single Category

Retrieve a single category by ID. **No Authentication Required.**

**Endpoint:** `GET /api/categories/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Category ID |

**Success Response (200 OK):**
```json
{
  "message": "Category Retrieved Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "CategoryName": "Software Development",
    "CategoryEmoji": "💻",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found** - Category not found or inactive
```json
{
  "message": "Category Not Found or Inactive"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/categories/507f1f77bcf86cd799439011
```

---

### 3. Get All Active Jobs

Retrieve all active job postings. **No Authentication Required.**

**Endpoint:** `GET /api/jobs`

**Success Response (200 OK):**
```json
{
  "message": "Jobs Retrieved Successfully",
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "JobTitle": "Senior UX Designer",
      "CompanyName": "TechFlow Solutions",
      "CompanyLogo": "https://example.com/logo.png",
      "JobImage": "https://example.com/job-image.jpg",
      "Category": {
        "_id": "507f1f77bcf86cd799439011",
        "CategoryName": "Design",
        "CategoryEmoji": "🎨"
      },
      "Salary": {
        "min": "₹12L",
        "max": "₹18L"
      },
      "Experience": {
        "min": 3,
        "max": 5
      },
      "Location": "Mumbai",
      "JobType": "Full Time",
      "WorkMode": "On-site",
      "HiringStatus": "Actively Hiring",
      "CompanyVerified": true,
      "MatchPercentage": 92,
      "AboutCompany": "Leading fintech startup...",
      "JobDescription": [
        "Design intuitive user interfaces...",
        "Collaborate with product managers..."
      ],
      "RequiredSkills": [
        "Figma",
        "Prototyping",
        "User Research"
      ],
      "InterviewProcess": [...],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Note:** 
- Only active jobs are returned
- Results are limited to 50 jobs
- Results are sorted by creation date (newest first)

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/jobs
```

**JavaScript Example:**
```javascript
fetch('http://localhost:3000/api/jobs')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.count} jobs`);
    data.data.forEach(job => {
      console.log(`${job.JobTitle} at ${job.CompanyName}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

---

### 4. Get Trending Jobs

Retrieve all trending job postings. **No Authentication Required.**

**Endpoint:** `GET /api/jobs/trending`

**Success Response (200 OK):**
```json
{
  "message": "Trending Jobs Retrieved Successfully",
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "JobTitle": "Senior UX Designer",
      "CompanyName": "TechFlow Solutions",
      "CompanyLogo": "https://example.com/logo.png",
      "JobImage": "https://example.com/job-image.jpg",
      "Category": {
        "_id": "507f1f77bcf86cd799439011",
        "CategoryName": "Design",
        "CategoryEmoji": "🎨"
      },
      "Salary": {
        "min": "₹12L",
        "max": "₹18L"
      },
      "Experience": {
        "min": 3,
        "max": 5
      },
      "Location": "Mumbai",
      "JobType": "Full Time",
      "WorkMode": "On-site",
      "HiringStatus": "Actively Hiring",
      "CompanyVerified": true,
      "MatchPercentage": 92,
      "AboutCompany": "Leading fintech startup...",
      "JobDescription": [
        "Design intuitive user interfaces...",
        "Collaborate with product managers..."
      ],
      "RequiredSkills": [
        "Figma",
        "Prototyping",
        "User Research"
      ],
      "InterviewProcess": [...],
      "isActive": true,
      "isTrending": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Note:** 
- Only active and trending jobs are returned
- Results are limited to 20 trending jobs
- Results are sorted by creation date (newest first)
- Jobs must have `isTrending: true` to appear in this list

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/jobs/trending
```

**JavaScript Example:**
```javascript
fetch('http://localhost:3000/api/jobs/trending')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.count} trending jobs`);
    data.data.forEach(job => {
      console.log(`🔥 ${job.JobTitle} at ${job.CompanyName}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

---

### 5. Get Latest Jobs

Retrieve the top 10 latest job postings based on creation date/time. **No Authentication Required.**

**Endpoint:** `GET /api/jobs/latest`

**Success Response (200 OK):**
```json
{
  "message": "Latest Jobs Retrieved Successfully",
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "JobTitle": "Senior UX Designer",
      "CompanyName": "TechFlow Solutions",
      "CompanyLogo": "https://example.com/logo.png",
      "JobImage": "https://example.com/job-image.jpg",
      "Category": {
        "_id": "507f1f77bcf86cd799439011",
        "CategoryName": "Design",
        "CategoryEmoji": "🎨"
      },
      "Salary": {
        "min": "₹12L",
        "max": "₹18L"
      },
      "Experience": {
        "min": 3,
        "max": 5
      },
      "Location": "Mumbai",
      "JobType": "Full Time",
      "WorkMode": "On-site",
      "HiringStatus": "Actively Hiring",
      "CompanyVerified": true,
      "MatchPercentage": 92,
      "AboutCompany": "Leading fintech startup...",
      "JobDescription": [
        "Design intuitive user interfaces...",
        "Collaborate with product managers..."
      ],
      "RequiredSkills": [
        "Figma",
        "Prototyping",
        "User Research"
      ],
      "InterviewProcess": [...],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Note:** 
- Only active jobs are returned
- Results are limited to the top 10 latest jobs
- Results are sorted by creation date/time in descending order (newest first)
- Based on the `createdAt` field

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/jobs/latest
```

**JavaScript Example:**
```javascript
fetch('http://localhost:3000/api/jobs/latest')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.count} latest jobs`);
    data.data.forEach(job => {
      console.log(`🆕 ${job.JobTitle} at ${job.CompanyName} - Created: ${job.createdAt}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

---

### 6. Search Jobs

Search for jobs by job title, company name, location, skills, or general keyword search. **No Authentication Required.**

**Endpoint:** `GET /api/jobs/search`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | String | No | General search query (searches in JobTitle, CompanyName, Location, and RequiredSkills) |
| title | String | No | Search by job title (case-insensitive, partial match) |
| company | String | No | Search by company name (case-insensitive, partial match) |
| location | String | No | Search by location (case-insensitive, partial match) |
| skill | String | No | Search by required skill (case-insensitive, partial match) |
| page | Number | No | Page number (default: 1) |
| limit | Number | No | Number of jobs per page (default: 10, max: 10) |

**Note:** 
- You can use multiple search parameters together (they will be combined with AND logic)
- The `q` parameter performs a general search across multiple fields (JobTitle, CompanyName, Location, RequiredSkills)
- All text searches are case-insensitive and support partial matches
- Results are sorted by creation date (newest first)
- Only active jobs are returned

**Success Response (200 OK):**
```json
{
  "message": "Jobs Search Completed Successfully",
  "count": 10,
  "totalJobs": 25,
  "currentPage": 1,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPreviousPage": false,
  "searchQuery": {
    "q": "developer",
    "title": null,
    "company": null,
    "location": "Mumbai",
    "skill": null
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "JobTitle": "Senior Full Stack Developer",
      "CompanyName": "TechFlow Solutions",
      "CompanyLogo": "https://example.com/logo.png",
      "JobImage": "https://example.com/job-image.jpg",
      "Category": {
        "_id": "507f1f77bcf86cd799439011",
        "CategoryName": "Software Development",
        "CategoryEmoji": "💻"
      },
      "Salary": {
        "min": "₹15L",
        "max": "₹25L"
      },
      "Experience": {
        "min": 3,
        "max": 5
      },
      "Location": "Mumbai",
      "JobType": "Full Time",
      "WorkMode": "Remote",
      "HiringStatus": "Actively Hiring",
      "CompanyVerified": true,
      "MatchPercentage": 92,
      "AboutCompany": "Leading fintech startup...",
      "JobDescription": [
        "Develop scalable web applications...",
        "Collaborate with cross-functional teams..."
      ],
      "RequiredSkills": [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB"
      ],
      "InterviewProcess": [...],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Response Fields:**
- `count`: Number of jobs in the current page
- `totalJobs`: Total number of jobs matching the search criteria
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `hasNextPage`: Boolean indicating if there's a next page
- `hasPreviousPage`: Boolean indicating if there's a previous page
- `searchQuery`: Object showing the search parameters used
- `data`: Array of job objects matching the search criteria

**Example Requests:**

**General search (searches in multiple fields):**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?q=developer"
```

**Search by job title:**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?title=UX%20Designer"
```

**Search by company name:**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?company=TechFlow"
```

**Search by location:**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?location=Mumbai"
```

**Search by skill:**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?skill=React"
```

**Combined search (multiple parameters):**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?title=Developer&location=Mumbai&page=1&limit=10"
```

**Search with pagination:**
```bash
curl -X GET "http://localhost:3000/api/jobs/search?q=developer&page=2&limit=10"
```

**JavaScript Examples:**

**Basic search by job title:**
```javascript
const searchTerm = "Developer";
fetch(`http://localhost:3000/api/jobs/search?title=${encodeURIComponent(searchTerm)}`)
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.totalJobs} jobs matching "${searchTerm}"`);
    console.log(`Page ${data.currentPage} of ${data.totalPages}`);
    data.data.forEach(job => {
      console.log(`${job.JobTitle} at ${job.CompanyName} - ${job.Location}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

**General search with pagination:**
```javascript
async function searchJobs(query, page = 1) {
  const response = await fetch(
    `http://localhost:3000/api/jobs/search?q=${encodeURIComponent(query)}&page=${page}&limit=10`
  );
  const data = await response.json();
  return data;
}

// Usage
searchJobs("Full Stack Developer", 1)
  .then(result => {
    console.log(`Found ${result.totalJobs} jobs`);
    console.log(`Current page: ${result.currentPage}/${result.totalPages}`);
    result.data.forEach(job => console.log(job.JobTitle));
  });
```

**Advanced search with multiple filters:**
```javascript
function buildSearchURL(params) {
  const baseURL = 'http://localhost:3000/api/jobs/search';
  const queryParams = new URLSearchParams();
  
  if (params.q) queryParams.append('q', params.q);
  if (params.title) queryParams.append('title', params.title);
  if (params.company) queryParams.append('company', params.company);
  if (params.location) queryParams.append('location', params.location);
  if (params.skill) queryParams.append('skill', params.skill);
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  
  return `${baseURL}?${queryParams.toString()}`;
}

// Usage
const searchParams = {
  title: "Developer",
  location: "Mumbai",
  skill: "React",
  page: 1,
  limit: 10
};

fetch(buildSearchURL(searchParams))
  .then(response => response.json())
  .then(data => {
    console.log(`Search Results: ${data.totalJobs} jobs found`);
    console.log(`Search Query Used:`, data.searchQuery);
    data.data.forEach(job => {
      console.log(`${job.JobTitle} - ${job.CompanyName} - ${job.Location}`);
    });
  });
```

**Empty search result:**
```json
{
  "message": "Jobs Search Completed Successfully",
  "count": 0,
  "totalJobs": 0,
  "currentPage": 1,
  "totalPages": 0,
  "hasNextPage": false,
  "hasPreviousPage": false,
  "searchQuery": {
    "q": "nonexistent",
    "title": null,
    "company": null,
    "location": null,
    "skill": null
  },
  "data": []
}
```

---

### 7. Get Jobs by Category

Retrieve jobs filtered by a specific category with pagination support. **No Authentication Required.**

**Endpoint:** `GET /api/jobs/category/:categoryId`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| categoryId | String | Yes | Category ID |

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | Number | No | 1 | Page number (starts from 1) |
| limit | Number | No | 10 | Number of jobs per page (max: 10) |

**Success Response (200 OK):**
```json
{
  "message": "Jobs Retrieved Successfully",
  "count": 10,
  "totalJobs": 25,
  "currentPage": 1,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPreviousPage": false,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "JobTitle": "Senior UX Designer",
      "CompanyName": "TechFlow Solutions",
      "Category": {
        "_id": "507f1f77bcf86cd799439011",
        "CategoryName": "Design",
        "CategoryEmoji": "🎨"
      },
      "Salary": {
        "min": "₹12L",
        "max": "₹18L"
      },
      "Experience": {
        "min": 3,
        "max": 5
      },
      "Location": "Mumbai",
      "JobType": "Full Time",
      "WorkMode": "On-site",
      "HiringStatus": "Actively Hiring",
      "CompanyVerified": true,
      "MatchPercentage": 92,
      "AboutCompany": "Leading fintech startup...",
      "JobDescription": [
        "Design intuitive user interfaces...",
        "Collaborate with product managers..."
      ],
      "RequiredSkills": [
        "Figma",
        "Prototyping",
        "User Research"
      ],
      "InterviewProcess": [...],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Response Fields:**
- `count`: Number of jobs in the current page
- `totalJobs`: Total number of jobs in the category
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `hasNextPage`: Boolean indicating if there's a next page
- `hasPreviousPage`: Boolean indicating if there's a previous page
- `data`: Array of job objects

**Note:** 
- Only active jobs are returned
- Results are sorted by creation date (newest first)
- Maximum 10 jobs per page
- Pagination starts from page 1

**Error Responses:**

**404 Not Found** - Category not found or inactive
```json
{
  "message": "Category Not Found or Inactive"
}
```

**Example Requests:**

Get first page (default):
```bash
curl -X GET http://localhost:3000/api/jobs/category/507f1f77bcf86cd799439011
```

Get specific page:
```bash
curl -X GET "http://localhost:3000/api/jobs/category/507f1f77bcf86cd799439011?page=2"
```

Get specific page with custom limit:
```bash
curl -X GET "http://localhost:3000/api/jobs/category/507f1f77bcf86cd799439011?page=1&limit=5"
```

**JavaScript Example:**
```javascript
const categoryId = "507f1f77bcf86cd799439011";
const page = 1;
const limit = 10;

fetch(`http://localhost:3000/api/jobs/category/${categoryId}?page=${page}&limit=${limit}`)
  .then(response => response.json())
  .then(data => {
    console.log(`Page ${data.currentPage} of ${data.totalPages}`);
    console.log(`Total jobs: ${data.totalJobs}`);
    console.log(`Jobs in this page: ${data.count}`);
    console.log(`Has next page: ${data.hasNextPage}`);
    console.log(`Has previous page: ${data.hasPreviousPage}`);
    
    data.data.forEach(job => {
      console.log(`${job.JobTitle} at ${job.CompanyName}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

**Pagination Example (Fetching all pages):**
```javascript
async function getAllJobsByCategory(categoryId) {
  let allJobs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `http://localhost:3000/api/jobs/category/${categoryId}?page=${page}&limit=10`
    );
    const data = await response.json();
    
    allJobs = allJobs.concat(data.data);
    hasMore = data.hasNextPage;
    page++;
  }

  return allJobs;
}

// Usage
getAllJobsByCategory("507f1f77bcf86cd799439011")
  .then(jobs => {
    console.log(`Retrieved all ${jobs.length} jobs`);
  });
```

---

### 8. Get Single Job

Retrieve a single job posting by ID. **No Authentication Required.**

**Endpoint:** `GET /api/jobs/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Job ID |

**Success Response (200 OK):**
```json
{
  "message": "Job Retrieved Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "JobTitle": "Senior UX Designer",
    "CompanyName": "TechFlow Solutions",
    "CompanyLogo": "https://example.com/logo.png",
    "JobImage": "https://example.com/job-image.jpg",
    "Category": {
      "_id": "507f1f77bcf86cd799439011",
      "CategoryName": "Design",
      "CategoryEmoji": "🎨"
    },
    "Salary": {
      "min": "₹12L",
      "max": "₹18L"
    },
    "Experience": {
      "min": 3,
      "max": 5
    },
    "Location": "Mumbai",
    "JobType": "Full Time",
    "WorkMode": "On-site",
    "HiringStatus": "Actively Hiring",
    "CompanyVerified": true,
    "MatchPercentage": 92,
    "AboutCompany": "Leading fintech startup based in Mumbai, focused on simplifying payments for the next billion users.",
    "JobDescription": [
      "Design intuitive user interfaces for our core mobile application used by millions.",
      "Collaborate with product managers and engineers to define product direction.",
      "Conduct user research and usability testing to iterate on designs.",
      "Create high-fidelity prototypes using Figma."
    ],
    "RequiredSkills": [
      "Figma",
      "Prototyping",
      "User Research",
      "Mobile Design",
      "Hindi (Spoken)"
    ],
    "InterviewProcess": [
      {
        "step": "Application Review",
        "description": "Usually takes 2-3 days",
        "duration": "2-3 days"
      },
      {
        "step": "Portfolio Walkthrough",
        "description": "Video call with Lead Designer",
        "duration": "1 hour"
      },
      {
        "step": "HR Discussion",
        "description": "Final round for salary & offer",
        "duration": "30 minutes"
      }
    ],
    "isActive": true,
    "isTrending": true,
    "ApplyURL": "https://techflow.com/careers/apply/ux-designer",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found** - Job not found or inactive
```json
{
  "message": "Job Not Found or Inactive"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/jobs/507f1f77bcf86cd799439012
```

**JavaScript Example:**
```javascript
const jobId = "507f1f77bcf86cd799439012";
fetch(`http://localhost:3000/api/jobs/${jobId}`)
  .then(response => response.json())
  .then(data => {
    const job = data.data;
    console.log(`Job: ${job.JobTitle}`);
    console.log(`Company: ${job.CompanyName}`);
    console.log(`Location: ${job.Location}`);
    console.log(`Salary: ${job.Salary.min} - ${job.Salary.max}`);
  })
  .catch(error => console.error('Error:', error));
```

---

## Data Models

### Category Response

```javascript
{
  _id: String,
  CategoryName: String,
  CategoryEmoji: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Job Response

```javascript
{
  _id: String,
  JobTitle: String,
  CompanyName: String,
  CompanyLogo: String,
  JobImage: String,
  Category: {
    _id: String,
    CategoryName: String,
    CategoryEmoji: String
  },
  Salary: {
    min: String,
    max: String
  },
  Experience: {
    min: Number,
    max: Number
  },
  Location: String,
  JobType: String,
  WorkMode: String,
  HiringStatus: String,
  CompanyVerified: Boolean,
  MatchPercentage: Number,
  AboutCompany: String,
  JobDescription: [String],
  RequiredSkills: [String],
  InterviewProcess: [{
    step: String,
    description: String,
    duration: String
  }],
  isActive: Boolean,
  isTrending: Boolean,
  ApplyURL: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 404 | Not Found - Resource not found or inactive |
| 500 | Internal Server Error - Server error |

---

## Important Notes

1. **No Authentication Required** - All endpoints in this API are publicly accessible
2. **Active Records Only** - Only active categories and jobs are returned
3. **Rate Limiting** - Consider implementing rate limiting for production use
4. **CORS Enabled** - CORS is enabled, so these endpoints can be accessed from any origin
5. **Job Limits** - Job listings are limited to 50 results per request
6. **Data Privacy** - Only public job information is exposed. Admin-only fields are not included

---

## Usage Examples

### Get Categories and Display

```javascript
// Fetch categories
fetch('http://localhost:3000/api/categories')
  .then(response => response.json())
  .then(data => {
    // Display categories
    data.data.forEach(category => {
      console.log(`${category.CategoryEmoji} ${category.CategoryName}`);
    });
  });
```

### Get Jobs for a Category

```javascript
// First, get categories
fetch('http://localhost:3000/api/categories')
  .then(response => response.json())
  .then(categoryData => {
    const designCategory = categoryData.data.find(cat => 
      cat.CategoryName === 'Design'
    );
    
    // Then get jobs for that category
    return fetch(`http://localhost:3000/api/jobs/category/${designCategory._id}`);
  })
  .then(response => response.json())
  .then(jobData => {
    console.log(`Found ${jobData.count} design jobs`);
    jobData.data.forEach(job => {
      console.log(`${job.JobTitle} at ${job.CompanyName}`);
    });
  });
```

### Search Jobs by Location

```javascript
// Get all jobs and filter client-side
fetch('http://localhost:3000/api/jobs')
  .then(response => response.json())
  .then(data => {
    const mumbaiJobs = data.data.filter(job => 
      job.Location.toLowerCase().includes('mumbai')
    );
    console.log(`Found ${mumbaiJobs.length} jobs in Mumbai`);
  });
```

---

## Testing

You can test these endpoints using:

- **Browser** - Simply open the URL in your browser
- **Postman** - Import the endpoints and test without authentication
- **cURL** - Use the example commands provided above
- **JavaScript Fetch API** - Use the JavaScript examples provided
- **Any HTTP client** - Make GET requests to the endpoints

---

## Future Enhancements

Consider implementing:
- Pagination for job listings
- Search functionality
- Filtering by multiple criteria (location, salary range, etc.)
- Sorting options
- Rate limiting
- Caching for better performance
