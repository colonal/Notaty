# Notaty - Modern Note-Taking Application

## Overview

Notaty is a web-based note-taking application that allows users to create, manage, and organize their notes efficiently. Built with a modern tech stack, it provides a seamless and responsive user experience for managing personal or professional notes.

## Features

- 🔐 **User Authentication**: Secure user registration and login functionality.
- 📝 **Full CRUD for Notes**: Create, read, update, and delete notes.
- 🚀 **Real-time Updates**: See changes to your notes instantly.
- 📱 **Responsive Design**: Looks great on both mobile and desktop devices.
- 🔒 **Secure Data Storage**: Your notes are stored securely in the database.
- ⚡ **Fast and Efficient**: Built with performance in mind.

## Technologies Used

### Frontend

- [Next.js](https://nextjs.org/) - React framework for production.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for robust applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.

### Backend

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Express.js](https://expressjs.com/) - Web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing notes.
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB.
- [JSON Web Tokens (JWT)](https://jwt.io/) - For securing the API.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Steps

1.  Clone the repository

    ```bash
    git clone https://github.com/colonal/Notaty.git
    cd notaty
    ```

2.  Install Server Dependencies

    ```bash
    cd server
    npm install
    ```

3.  Install Client Dependencies

    ```bash
    cd ../client
    npm install
    ```

4.  Configure Environment Variables
    Create a `.env` file in the `server` directory with the following variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    ```
    _Note: The client application expects the server to be running on port 5000._

## Usage

### Running the Server

1.  Start the server:
    ```bash
    cd server
    npm run dev    # for development
    # or
    npm start      # for production
    ```
    The server will start on http://localhost:5000

### Running the Client

1.  Start the client:
    ```bash
    cd client
    npm run dev
    ```
    The client will be available at http://localhost:3000

## Folder Structure

```
notaty/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       # Auth pages (login, signup)
│   │   │   └── (main)/       # Main application pages
│   │   ├── components/     # Reusable React components
│   │   ├── hooks/          # Custom React hooks
│   │   └── services/       # API service calls
│   └── package.json
└── server/
    ├── src/
    │   ├── config/         # Database and environment config
    │   ├── features/       # Core features (users, notes)
    │   │   ├── notes/
    │   │   └── user/
    │   ├── middlewares/    # Custom Express middlewares
    │   └── utils/          # Utility functions (auth, response)
    └── package.json
```

## Deployment

### Backend Deployment (e.g., Render)

The backend can be deployed on services like Render.

1. Create a new Web Service.
2. Connect your GitHub repository.
3. Configure environment variables.
4. Deploy using the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`

### Frontend Deployment (e.g., Vercel)

The frontend is best deployed on a service like Vercel, which is optimized for Next.js.

1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. Vercel will automatically detect it's a Next.js app and configure build settings.
4. Add environment variables if needed (e.g., for the API URL).
5. Deploy.

## Contact

For any inquiries or issues, please open an issue on the GitHub repository.

## License

This project is licensed under the ISC License.
