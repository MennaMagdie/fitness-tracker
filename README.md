# NeuroFit

**NeuroFit** is a full-stack fitness tracking web application built using **MERN stack** (MongoDB, Express, React, Node.js). The platform aims to help users monitor their fitness journey, engage with a fitness community, and access personalized health tools.

---

## Live Demo

to be added: link lel deployment

---

## Key Features

- Responsive landing page with smooth navigation
- Authentication system (sign up / log in)
- Personalized dashboard with progress charts and trackers
- Profile management with BMI calculator and streak tracking
- Community feed for posts and interaction
- Reminders, workout recommendations, and nutrition tracking
- Online trainer services and payment support

---

## App Structure (Pages & Routes) "FOR NOWWW"

| Route         | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `/`           | Landing page with intro, about, testimonials, contact, and sign up/login   |
| `/signup`     | User registration with name, email, password, and location                 |
| `/login`      | Secure login with email/username and password                              |
| `/home`       | Welcome message, daily workout ideas, leaderboard highlights               |
| `/profile`    | User settings, streak info, BMI display (with API or calculator)           |
| `/dashboard`  | Progress analytics, nutrition tracker, reminders                           |
| `/workouts`   | Browse and filter workouts by type, time, or difficulty                    |
| `/community`  | Social feed-like section with user-generated posts                         |
| `/feedback`   | Submit suggestions, bug reports, or testimonials                           |
---


## Project Structure (IMPORTANT WE NEED TO FOLLOW IT FOR AN ORGANIZED PROJECT)

```plaintext
src folder:


├── App.tsx       # main 
├── App.css       # general design (applied on all pages)

├── pages/        # directory containing all pages
        ├── Landing.tsx
        ├── Home.tsx
        ├── Login.tsx
        .
        .

├── components/           
        ├── Navbar.tsx      # files for all reusable components 
        ├── Navbar.css      # and their css
        ├── Landing/        # folder for custom components per page
                ├── Hero.tsx
                ├── Hero.css        
                ├── Pricing.tsx
                ├── Pricing.css
        ├── Home/        
                ├── blabla.tsx
                ├── blabla.css
```

## Tech Stack

**Frontend**
- React + TypeScript
- CSS Modules / Custom CSS
- Responsive design (Mobile-First)
- React Router for client-side routing

**Backend (Not yet done)**
- Node.js
- Express.js
- MongoDB for user data and posts
---
## Deployment link: 
https://lnkd.in/g3Hg4QxQ
