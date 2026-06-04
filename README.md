# Internship-Management-System

## Features

### Authentication

* User Registration (Roles: Student or Company Recruiter)
* User Login
* Password Security
* Persistent Sessions
* Logout Functionality

### Student Modules

* View Open Internship Listings
* Dynamic Application Button Disabling (Prevents duplicate applications)
* Tracking Workspace (Monitor individual application review states)
* Personal User Profile

### Recruiter Modules

* Create and Publish Live Internship Listings
* Recruiter Action Hub (Review specific candidate profiles who applied to postings)
* Company Profile Assignment

### Advanced Features

* Linked Relational Mappings
* MongoDB Database Integration
* Conditional Component Swapping UI

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* React.js (Vanilla Javascript implementation via state hooks)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* bcryptjs

## Database Design

### Users Collection

Fields:

* name
* email
* password (hashed)
* role (student / recruiter / admin)
* skills
* companyDetails (Reference ID pointing to Companies Collection)

### Companies Collection

Fields:

* name
* website
* description

### Jobs Collection

Fields:

* title
* company (Reference ID pointing to Companies Collection)
* description

### Applications Collection

Fields:

* job (Reference ID pointing to Jobs Collection)
* student (Reference ID pointing to Users Collection)
* status (applied / interview / offered / rejected)

---

## API Routes

### Authentication Routes

POST /api/auth/register

* Hashes user password, generates company document inline if role is recruiter, and saves new user data.

POST /api/auth/login

* Compares input credentials against hashed records and logs in user session.

---

### Core Data Routes

GET /api/users/:id

* Pulls specific user profile details along with populated company records.

GET /api/companies

* Fetches all registered company descriptions.

POST /api/jobs

* Publishes a new internship vacancy linked to a company.

GET /api/jobs

* Retreives all active internships with populated company details.

POST /api/applications

* Submits an application entry tracking a student's interest in a job.

GET /api/applications/student/:id

* Gathers all applications placed by a specific student ID to display metrics or disable buttons.

GET /api/applications/recruiter/:companyId

* Aggregates all applications submitted to jobs posted by a specific recruiter's company, populating candidate info.

---

## Authentication Flow

1. User provides name, email, password, and specifies their role platform-wide.
2. Recruiters provide inline company metrics; Students enter base data fields.
3. Node server intercepts parameters, routing passwords into 10-round bcrypt salting processes.
4. Database commits profiles securely.
5. Frontend retains context via state vectors upon successful login, filtering navigation views dynamically based on configuration classifications.

---

## Application State Handling

Students encounter active logic preventing duplicate data requests:

* App fetches the specific user's historic targets array when loading the job board.
* Declarative Javascript loops cross-check active jobs against submission arrays via an analytical `.some()` lookup execution.
* If a match occurs, the corresponding "Apply Now" node automatically deactivates, changing style attributes to gray while turning off text tracking functions.

---


## Installation

### 1. Configure the Backend Application

1. Open your terminal environment window and navigate to your backend repository directory:
```bash
cd internship-backend

```


2. Download all database management and core server packages:
```bash
npm install express mongoose cors bcryptjs

```


3. Boot up your Node processing server instance:
```bash
node server.js

```



### 2. Configure the Frontend UI

1. Open a second separate terminal window and switch paths to your client directory layout:
```bash
cd internship-frontend

```


2. Gather standard local package configurations:
```bash
npm install

```


3. Boot up the local client application workspace:
```bash
npm start

```



---

## Default Workflow

1. Setup local folders.
2. Launch database and local servers.
3. Access platform interface registration menu.
4. Build individual account types (Recruiter details populate metadata fields).
5. Review company dashboards.
6. Publish internships via company accounts.
7. Switch view context to Student accounts.
8. Locate entries on the job marketplace.
9. Click interactive submission controls (Triggers dynamic gray button disabling states).
10. Check dashboard feeds to trace ongoing application review states.
