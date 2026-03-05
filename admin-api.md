# Admin API Documentation

This document provides comprehensive documentation for the Admin API endpoints.

## Base URL

All admin endpoints are prefixed with `/admin`

## Endpoints

### 1. Admin Signup

Register a new admin account.

**Endpoint:** `POST /admin/signup`

**Request Body:**
```json
{
  "Email": "admin@example.com",
  "Password": "yourpassword123"
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Email | String | Yes | Admin email address |
| Password | String | Yes | Admin password |

**Success Response (200 OK):**
```json
{
  "message": "Admin Created Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Password": "yourpassword123"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing required fields
```json
{
  "message": "Email and Password are required"
}
```

**200 OK** - Admin already exists
```json
{
  "message": "Admin Already Exist"
}
```

**500 Internal Server Error**
```json
{
  "message": "Internal Server Error",
  "error": "Error message details"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com",
    "Password": "securepassword123"
  }'
```

---

### 2. Admin Login

Authenticate an admin user and login.

**Endpoint:** `POST /admin/login`

**Request Body:**
```json
{
  "Email": "admin@example.com",
  "Password": "yourpassword123"
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Email | String | Yes | Admin email address |
| Password | String | Yes | Admin password |

**Success Response (200 OK):**
```json
{
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsIkVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2ODk1MjM0NTYsImV4cCI6MTY4OTYwOTg1Nn0.example",
  "data": {
    "Email": "admin@example.com",
    "id": "507f1f77bcf86cd799439011"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing required fields
```json
{
  "message": "Email and Password are required"
}
```

**404 Not Found** - Admin does not exist
```json
{
  "message": "Admin Not Found"
}
```

**401 Unauthorized** - Invalid password
```json
{
  "message": "Invalid Password"
}
```

**500 Internal Server Error**
```json
{
  "message": "Internal Server Error",
  "error": "Error message details"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com",
    "Password": "securepassword123"
  }'
```

---

### 3. Create Job Category

Create a new job category. **Requires JWT Authentication.**

**Endpoint:** `POST /admin/category`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "CategoryName": "Software Development",
  "CategoryEmoji": "💻",
  "isActive": true
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| CategoryName | String | Yes | Name of the job category |
| CategoryEmoji | String | Yes | Emoji icon for the category |
| isActive | Boolean | No | Active status (default: true) |

**Success Response (201 Created):**
```json
{
  "message": "Category Created Successfully",
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

**400 Bad Request** - Missing required fields
```json
{
  "message": "CategoryName and CategoryEmoji are required"
}
```

**400 Bad Request** - Category already exists
```json
{
  "message": "Category Already Exist"
}
```

**401 Unauthorized** - No token provided
```json
{
  "message": "Access Denied. No token provided."
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/admin/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "CategoryName": "Software Development",
    "CategoryEmoji": "💻",
    "isActive": true
  }'
```

---

### 4. Get All Categories

Retrieve all job categories. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/category`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

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
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/category \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 5. Get Single Category

Retrieve a single category by ID. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/category/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

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

**404 Not Found**
```json
{
  "message": "Category Not Found"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/category/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 6. Update Category

Update an existing category. **Requires JWT Authentication.**

**Endpoint:** `PUT /admin/category/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Category ID |

**Request Body:**
```json
{
  "CategoryName": "Web Development",
  "CategoryEmoji": "🌐",
  "isActive": true
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| CategoryName | String | No | Updated category name |
| CategoryEmoji | String | No | Updated category emoji |
| isActive | Boolean | No | Updated active status |

**Success Response (200 OK):**
```json
{
  "message": "Category Updated Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "CategoryName": "Web Development",
    "CategoryEmoji": "🌐",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found**
```json
{
  "message": "Category Not Found"
}
```

**400 Bad Request** - Category name already exists
```json
{
  "message": "Category Name Already Exist"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/admin/category/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "CategoryName": "Web Development",
    "CategoryEmoji": "🌐",
    "isActive": true
  }'
```

---

### 7. Update Category Status (Active/Deactive)

Update only the active status of a category. **Requires JWT Authentication.**

**Endpoint:** `PUT /admin/category/:id/status`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Category ID |

**Request Body:**
```json
{
  "isActive": false
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| isActive | Boolean | Yes | Active status (true/false) |

**Success Response (200 OK):**
```json
{
  "message": "Category Deactivated Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "CategoryName": "Software Development",
    "CategoryEmoji": "💻",
    "isActive": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing isActive
```json
{
  "message": "isActive status is required"
}
```

**404 Not Found**
```json
{
  "message": "Category Not Found"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/admin/category/507f1f77bcf86cd799439011/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "isActive": false
  }'
```

---

### 8. Delete Category

Delete a category permanently. **Requires JWT Authentication.**

**Endpoint:** `DELETE /admin/category/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Category ID |

**Success Response (200 OK):**
```json
{
  "message": "Category Deleted Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "CategoryName": "Software Development",
    "CategoryEmoji": "💻",
    "isActive": true
  }
}
```

**Error Responses:**

**404 Not Found**
```json
{
  "message": "Category Not Found"
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/admin/category/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 9. Get Active Categories Only

Retrieve only active categories. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/category/active/list`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200 OK):**
```json
{
  "message": "Active Categories Retrieved Successfully",
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "CategoryName": "Software Development",
      "CategoryEmoji": "💻",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/category/active/list \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## Job Management APIs

### 10. Create Job

Create a new job posting. **Requires JWT Authentication.**

**Endpoint:** `POST /admin/job`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "JobTitle": "Senior UX Designer",
  "CompanyName": "TechFlow Solutions",
  "CompanyLogo": "https://example.com/logo.png",
  "JobImage": "https://example.com/job-image.jpg",
  "Category": "507f1f77bcf86cd799439011",
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
  "ApplyURL": "https://techflow.com/careers/apply/ux-designer",
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
  "isActive": true
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| JobTitle | String | **Yes** | Job title/position name |
| CompanyName | String | **Yes** | Company name |
| Category | ObjectId | **Yes** | Category ID (must exist) |
| CompanyLogo | String | No | Company logo URL or base64 (default: '') |
| JobImage | String | No | Job image URL or base64 (default: '') |
| Salary | Object | No | Salary range with min and max (default: {min: '', max: ''}) |
| Experience | Object | No | Experience range with min and max in years (default: {min: 0, max: 0}) |
| Location | String | No | Job location (default: '') |
| JobType | String | No | Full Time, Part Time, Contract, Internship (default: 'Full Time') |
| WorkMode | String | No | On-site, Remote, Hybrid (default: 'On-site') |
| HiringStatus | String | No | Actively Hiring, Not Hiring, Closed (default: 'Actively Hiring') |
| CompanyVerified | Boolean | No | Company verification status (default: false) |
| MatchPercentage | Number | No | Match percentage (default: 0) |
| AboutCompany | String | No | Company description (default: '') |
| JobDescription | Array | No | Array of job description bullet points (default: []) |
| RequiredSkills | Array | No | Array of required skills (default: []) |
| InterviewProcess | Array | No | Array of interview process steps (default: []) |
| isActive | Boolean | No | Active status (default: true) |
| isTrending | Boolean | No | Trending status (default: false) |
| ApplyURL | String | No | URL where users can apply for the job (default: '') |

**Success Response (201 Created):**
```json
{
  "message": "Job Created Successfully",
  "data": {
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
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing required fields
```json
{
  "message": "JobTitle, CompanyName, and Category are required"
}
```

**Note:** Only `JobTitle`, `CompanyName`, and `Category` are required. All other fields are optional and will use default values if not provided.

**404 Not Found** - Category not found
```json
{
  "message": "Category Not Found"
}
```

**Example Request (Minimal - Only Required Fields):**
```bash
curl -X POST http://localhost:3000/admin/job \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "JobTitle": "Senior UX Designer",
    "CompanyName": "TechFlow Solutions",
    "Category": "507f1f77bcf86cd799439011"
  }'
```

**Example Request (With All Optional Fields):**
```bash
curl -X POST http://localhost:3000/admin/job \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "JobTitle": "Senior UX Designer",
    "CompanyName": "TechFlow Solutions",
    "Category": "507f1f77bcf86cd799439011",
    "Salary": {"min": "₹12L", "max": "₹18L"},
    "Experience": {"min": 3, "max": 5},
    "Location": "Mumbai",
    "AboutCompany": "Leading fintech startup...",
    "JobDescription": ["Design intuitive interfaces..."],
    "RequiredSkills": ["Figma", "Prototyping"]
  }'
```

---

### 11. Get All Jobs

Retrieve all job postings. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/job`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

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
      "Category": {
        "_id": "507f1f77bcf86cd799439011",
        "CategoryName": "Design",
        "CategoryEmoji": "🎨"
      },
      "Salary": {
        "min": "₹12L",
        "max": "₹18L"
      },
      "Location": "Mumbai",
      "isActive": true
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/job \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 12. Get Active Jobs Only

Retrieve only active job postings. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/job/active/list`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200 OK):**
```json
{
  "message": "Active Jobs Retrieved Successfully",
  "count": 8,
  "data": [...]
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/job/active/list \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 13. Get Jobs by Category

Retrieve jobs filtered by category. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/job/category/:categoryId`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| categoryId | String | Yes | Category ID |

**Success Response (200 OK):**
```json
{
  "message": "Jobs Retrieved Successfully",
  "count": 5,
  "data": [...]
}
```

**Error Responses:**

**404 Not Found** - Category not found
```json
{
  "message": "Category Not Found"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/job/category/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 14. Get Single Job

Retrieve a single job posting by ID. **Requires JWT Authentication.**

**Endpoint:** `GET /admin/job/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

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
    "JobDescription": ["Design intuitive interfaces..."],
    "RequiredSkills": ["Figma", "Prototyping"],
    "InterviewProcess": [...],
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found**
```json
{
  "message": "Job Not Found"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/admin/job/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### 15. Update Job

Update an existing job posting. **Requires JWT Authentication.**

**Endpoint:** `PUT /admin/job/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Job ID |

**Request Body:** (All fields optional, only include fields to update)
```json
{
  "JobTitle": "Lead UX Designer",
  "Salary": {
    "min": "₹15L",
    "max": "₹20L"
  },
  "HiringStatus": "Not Hiring"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Job Updated Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "JobTitle": "Lead UX Designer",
    ...
  }
}
```

**Error Responses:**

**404 Not Found**
```json
{
  "message": "Job Not Found"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/admin/job/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "JobTitle": "Lead UX Designer",
    "Salary": {"min": "₹15L", "max": "₹20L"}
  }'
```

---

### 16. Update Job Status (Active/Deactive)

Update only the active status of a job. **Requires JWT Authentication.**

**Endpoint:** `PUT /admin/job/:id/status`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Job ID |

**Request Body:**
```json
{
  "isActive": false
}
```

**Success Response (200 OK):**
```json
{
  "message": "Job Deactivated Successfully",
  "data": {...}
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/admin/job/507f1f77bcf86cd799439012/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"isActive": false}'
```

---

### 17. Assign/Update Category to Job

Assign or update the category for a job. **Requires JWT Authentication.**

**Endpoint:** `PUT /admin/job/:id/category`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Job ID |

**Request Body:**
```json
{
  "Category": "507f1f77bcf86cd799439011"
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Category | ObjectId | Yes | Category ID to assign |

**Success Response (200 OK):**
```json
{
  "message": "Category Assigned Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "Category": {
      "_id": "507f1f77bcf86cd799439011",
      "CategoryName": "Design",
      "CategoryEmoji": "🎨"
    },
    ...
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing category
```json
{
  "message": "Category is required"
}
```

**404 Not Found** - Job or Category not found
```json
{
  "message": "Job Not Found"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/admin/job/507f1f77bcf86cd799439012/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"Category": "507f1f77bcf86cd799439011"}'
```

---

### 18. Delete Job

Delete a job posting permanently. **Requires JWT Authentication.**

**Endpoint:** `DELETE /admin/job/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Job ID |

**Success Response (200 OK):**
```json
{
  "message": "Job Deleted Successfully",
  "data": {...}
}
```

**Error Responses:**

**404 Not Found**
```json
{
  "message": "Job Not Found"
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/admin/job/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## JWT Authentication

The Admin API uses JWT (JSON Web Tokens) for authentication. After successful login, a JWT token is returned which should be used for authenticated requests.

### Token Usage

After logging in, you will receive a JWT token in the response. Include this token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your-token-here>
```

### Token Details

- **Expiration**: Tokens expire after 24 hours
- **Format**: Bearer token in Authorization header
- **Secret**: Configured via `JWT_SECRET` environment variable (default: 'your-secret-key-change-in-production')

### Environment Setup

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### JWT Middleware

A JWT authentication middleware is available at `middleware/auth.js` that can be used to protect routes:

```javascript
const authenticateToken = require('../middleware/auth');

// Protect a route
router.get('/protected-route', authenticateToken, (req, res) => {
  // req.admin contains the decoded token data
  res.json({ message: 'Protected route', admin: req.admin });
});
```

### Example: Using Token in Requests

```bash
# Login first to get token
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com",
    "Password": "securepassword123"
  }'

# Use token in protected route
curl -X GET http://localhost:3000/admin/protected-route \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Token Error Responses

**401 Unauthorized** - No token provided
```json
{
  "message": "Access Denied. No token provided."
}
```

**403 Forbidden** - Invalid or expired token
```json
{
  "message": "Invalid or Expired Token",
  "error": "jwt expired"
}
```

---

## Data Model

### Admin Model

```javascript
{
  Email: String (required),
  Password: String (required)
}
```

### Category Model

```javascript
{
  CategoryName: String (required),
  CategoryEmoji: String (required),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Job Model

```javascript
{
  JobTitle: String (required),
  CompanyName: String (required),
  CompanyLogo: String,
  JobImage: String,
  Category: ObjectId (required, ref: 'category'),
  Salary: {
    min: String (required),
    max: String (required)
  },
  Experience: {
    min: Number (required),
    max: Number (required)
  },
  Location: String (required),
  JobType: String (enum: ['Full Time', 'Part Time', 'Contract', 'Internship']),
  WorkMode: String (enum: ['On-site', 'Remote', 'Hybrid']),
  HiringStatus: String (enum: ['Actively Hiring', 'Not Hiring', 'Closed']),
  CompanyVerified: Boolean,
  MatchPercentage: Number,
  AboutCompany: String (required),
  JobDescription: [String] (required),
  RequiredSkills: [String] (required),
  InterviewProcess: [{
    step: String,
    description: String,
    duration: String
  }],
  isActive: Boolean (default: true),
  isTrending: Boolean (default: false),
  ApplyURL: String (default: ''),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Missing or invalid parameters |
| 401 | Unauthorized - Invalid credentials or no token |
| 403 | Forbidden - Invalid or expired token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Notes

- All requests should include `Content-Type: application/json` header
- **JWT tokens are required for protected routes** - Include token in `Authorization: Bearer <token>` header
- Passwords are currently stored in plain text (consider implementing password hashing for production)
- Email addresses should be unique for each admin account
- The API uses MongoDB for data storage
- JWT tokens expire after 24 hours - users need to login again after expiration
- Set `JWT_SECRET` in `.env` file for production use

---

## Testing

You can test these endpoints using:
- **Postman** - Import the endpoints and test with sample data
- **cURL** - Use the example commands provided above
- **Thunder Client** - VS Code extension for API testing
- **Any HTTP client** - Make POST requests to the endpoints

---

## Future Enhancements

Consider implementing:
- Password hashing (bcrypt) - Currently passwords are stored in plain text
- Refresh token mechanism for better security
- Email validation
- Password strength requirements
- Rate limiting
- Admin role/permissions management
- Token blacklisting for logout functionality