# OpenHW Studio BE Docs

This file documents the current backend in `openhw-studio-backend/src`.

## Overview

The backend is an Express 4 + MongoDB service with:

- JWT-based protected APIs
- Google OAuth via Passport
- Classroom, assignment, notice, comment, and submission management
- Arduino compile/flash and serial-port APIs
- Gamification/progress APIs
- Component moderation/admin utilities
- File upload support using Multer

## Runtime

Main entry:

- `openhw-studio-backend/src/server.js`

What it does:

- loads env values
- ensures temp/component directories exist
- connects to MongoDB
- mounts `/api` and `/auth`
- serves examples from `/examples`

Core middleware:

- `cors()`
- `express.json({ limit: '25mb' })`
- `express.urlencoded({ extended: true, limit: '25mb' })`
- `express-session`
- `passport.initialize()`
- `passport.session()`

Scripts from `package.json`:

- `npm run start`
- `npm run dev`

## Route Mounts

Mounted in `openhw-studio-backend/src/routes/api.js`:

- `/api/user`
- `/api/compile`
- `/api/classroom`
- `/api/progress`
- `/api/lib-*`
- `/api/components/*`
- `/api/admin/components/*`

Mounted separately:

- `/auth`

## Auth Routes

Base: `/auth`

- `GET /auth/google`
  Starts Google OAuth flow.
- `GET /auth/google/callback`
  Handles callback, signs JWT, redirects to frontend with token.
- `GET /auth/me`
  Returns current authenticated user profile.

## User Routes

Base: `/api/user`

- `POST /signup`
  Register local user.
- `POST /signin`
  Login with email/password.
- `POST /google`
  Login using Google access token.
- `POST /logout`
  Logout protected user.
- `PUT /profile`
  Update profile fields.

Main controller:

- `openhw-studio-backend/src/controllers/userController.js`

## Classroom Routes

Base: `/api/classroom`

Class lifecycle:

- `POST /`
- `GET /`
- `GET /:classId`
- `PUT /:classId`
- `DELETE /:classId`
- `POST /join`
- `POST /:classId/invite`

Students:

- `GET /:classId/students`
- `DELETE /:classId/students/:studentId`

Assignments:

- `POST /:classId/assignments`
- `PUT /:classId/assignments/:assignmentId`
- `GET /assignments`
- `DELETE /:classId/assignments/:assignmentId`

Submissions:

- `GET /:classId/assignments/:assignmentId/submissions`
- `GET /:classId/assignments/:assignmentId/submission`
- `POST /:classId/assignments/:assignmentId/submission`

Notices:

- `POST /:classId/notices`
- `PUT /:classId/notices/:noticeId`
- `GET /:classId/notices`
- `DELETE /:classId/notices/:noticeId`

Comments:

- `POST /:classId/comments`
- `GET /:classId/comments`
- `DELETE /:classId/comments/:commentId`

Uploads:

- `POST /uploads`

Main controller:

- `openhw-studio-backend/src/controllers/classroomController.js`

## Compile Routes

Base: `/api/compile`

- `POST /`
  Compile Arduino code.
- `POST /flash`
  Flash firmware.
- `GET /ports`
  List serial ports.
- `GET /lib-search`
  Search Arduino libraries.
- `POST /lib-install`
  Install library.
- `GET /lib-list`
  List libraries.

Main controller:

- `openhw-studio-backend/src/controllers/compileController.js`

## Progress Routes

Base: `/api/progress`

- `GET /`
- `POST /quiz`
- `POST /unlock`
- `POST /complete`
- `POST /badge`
- `GET /leaderboard`
- `PUT /reset`

Main controller:

- `openhw-studio-backend/src/controllers/progressController.js`

## Library Routes

Mounted directly under `/api`:

- `GET /api/lib-search`
- `POST /api/lib-install`
- `POST /api/lib-uninstall`
- `GET /api/lib-list`

Controller:

- `openhw-studio-backend/src/controllers/libController.js`

## Component/Admin Routes

Mounted directly under `/api`:

- `POST /api/components/submit`
- `GET /api/admin/components/pending`
- `POST /api/admin/components/approve`
- `DELETE /api/admin/components/reject/:submissionId`
- `GET /api/admin/components/installed`
- `DELETE /api/admin/components/installed/:id`
- `GET /api/admin/components/backup`

Controller:

- `openhw-studio-backend/src/controllers/componentController.js`

## Authentication and Middleware

### `authMiddleware.js`

Responsibilities:

- reads JWT from bearer header or `jwt` cookie
- verifies token
- fetches user from MongoDB
- attaches `req.user`

### `classroomUpload.js`

Responsibilities:

- handles upload destination logic
- builds public asset URLs for classroom/profile files
- integrates with Multer

### `passport.js`

Responsibilities:

- Google OAuth strategy
- user lookup/creation for OAuth flow

## Core Models

### User

File:

- `openhw-studio-backend/src/models/User.js`

Key fields:

- `name`
- `email`
- `googleId`
- `password`
- `role`
- `college`
- `branch`
- `semester`
- `bio`
- `image`
- `classes`
- `points`
- `coins`
- `level`
- `badges`

### Class

File:

- `openhw-studio-backend/src/models/Class.js`

Key fields:

- `name`
- `bio`
- `image`
- `teacher`
- `joinCode`
- `students`
- `assignments`
- `notices`

### Assignment

File:

- `openhw-studio-backend/src/models/Assignment.js`

Key fields:

- `classId`
- `title`
- `description`
- `templateProjectId`
- `dueDate`
- `attachments`
- `files`
- `createdBy`

### Notice

File:

- `openhw-studio-backend/src/models/Notice.js`

Key fields:

- `classId`
- `title`
- `message`
- `attachments`
- `files`
- `createdBy`

### Submission

File:

- `openhw-studio-backend/src/models/Submission.js`

Key fields:

- `assignmentId`
- `studentId`
- `classId`
- `projectId`
- `notes`
- `attachments`
- `files`
- `score`
- `feedback`

Important index:

- unique `(assignmentId, studentId)`

### Comment

File:

- `openhw-studio-backend/src/models/Comment.js`

Key fields:

- `classId`
- `postId`
- `postType`
- `message`
- `createdBy`

### Project

File:

- `openhw-studio-backend/src/models/Project.js`

Key fields:

- `userId`
- `board`
- `components`
- `connections`
- `code`
- `isAssignment`
- `assignmentId`

### Progress / UserProgress

Files:

- `openhw-studio-backend/src/models/Progress.js`
- `openhw-studio-backend/src/models/UserProgress.js`

Tracks:

- level/xp/coins
- badges
- unlocked components
- quiz attempts
- completed projects
- streak information

## Suggested Reading Order

1. `src/server.js`
2. `src/routes/api.js`
3. `src/routes/auth.js`
4. `src/middleware/authMiddleware.js`
5. `src/controllers/userController.js`
6. `src/routes/classroom.js`
7. `src/controllers/classroomController.js`
8. classroom-related models
9. compile, progress, library, and component controllers

## Notes

- File uploads are handled server-side and stored as asset paths, not large file bodies in MongoDB.
- Classroom permissions are enforced in controller logic.
- The classroom controller is the largest domain module and the best place to understand the application business logic.

---
