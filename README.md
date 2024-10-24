# Social Media App - JavaScript 2 Course Assignment

<img width="1176" alt="image" src="https://github.com/user-attachments/assets/a0f975ee-6a7a-4aaf-8285-350bb8358f1b">

## Overview

This project is an interactive social media application where users can perform typical CRUD (Create, Read, Update, Delete) operations on posts, register and log in, and manage their interactions through the app. The primary goal is to implement the app's functionality using JavaScript and work with a provided API, which handles authentication and post management. Styling and design are secondary in this phase.

## Description

The social media platform allows users to register, create posts, and manage content directly from their dashboard. The app is designed to showcase JavaScript's capabilities in interacting with an API and managing user sessions using JWT tokens.

## Features

- User Registration: New users can create an account.
- User Login: Registered users can log in and receive a JWT for authenticated API requests.
- Follow/Unfollow User: Users can follow or unfollow other users to curate their feed. (in progress)
- Create Posts: Logged-in users can create new posts and share content.
- Get Single Post: View details of a single post by its ID.
- Get Many Posts: Browse and view a list of posts from various users.
- Get Posts of a User: View posts created by a specific user.
- Get Posts from Followed Users: View posts from users you follow.(in progress)
- Search Posts: Search for posts based on keywords or tags. (in progress)
- Edit Posts: Users can edit their existing posts.
- Delete Posts: Users can delete their posts if needed.
- Comment on Post: Users can comment on posts to engage with content. (in progress)
- Reply to Comment: Users can reply to comments on posts. (in progress)
- React to Post: Users can react to posts (e.g., like, love, etc.) to express their engagement. (in progress)

#### API Integration

The app communicates with a backend API to handle:

- User registration and login with JWT tokens
- Create, edit, delete, and fetch posts
- Follow/unfollow users
- Comment, reply, and react to posts

## Built With

- HTML
- CSS (basic structure, minimal styling)
- JavaScript (ES6)
- Vite (development server and build tool)
- API for Backend Operations

## Getting Started

### Prerequisites

To run the project locally, ensure you have the following installed:

- Node.js: Download and install Node.js

### Installing

1. Clone the repository:

```bash
git clone https://github.com/NoroffFEU/fed2-js2-ca-AnnaAaBrekke
```

2. Navigate into the project directory:

```bash
   cd fed2-js2-ca-AnnaAaBrekke
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Build for production:

```bash
npm run build
```

3. Preview the production build:

```bash
npm run preview
```

### Linting and Formatting

- Run ESLint

```bash
npm run lint
```

- Format code with Prettier

```bash
npm run format
```

### Pre-Commit Hook

This project uses Husky to run Prettier before committing changes.
Husky is set up to format your code before every commit:

## Access the following pages directly from the browser:

- [Home Page](https://socialmediajs2anna.netlify.app/)
- [Create Post Page](https://socialmediajs2anna.netlify.app/post/create/)
- [Login Page](https://socialmediajs2anna.netlify.app/auth/login/)
- [Register Page](https://socialmediajs2anna.netlify.app/auth/register/)
- [Profile Page](https://socialmediajs2anna.netlify.app/profile/)

## Contact Me

You can connect with me on:

- [LinkedIn](https://www.linkedin.com/in/anna-aasprong-brekke-a571132b0/)
- [Instagram](https://www.instagram.com/annabrekke/)
