# Notaty - Modern Note-Taking Application

## Overview
Notaty is a web-based note-taking application that allows users to create, manage, and organize their notes efficiently. Built with a modern tech stack, it provides a seamless and responsive user experience for managing personal or professional notes.

## Features
- 📝 Create and edit notes in real-time
- 🗂️ Organize notes with categories
- 🔍 Search functionality
- 📱 Responsive design for mobile and desktop
- 🔒 Secure data storage
- ⚡ Fast and efficient performance

## Technologies Used
### Frontend
- HTML5
- CSS3
- JavaScript
- Modern Modal System

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- RESTful API
- CORS enabled

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Steps
1. Clone the repository
   ```bash
   git clone https://github.com/colonal/Notaty.git
   cd notaty
   ```

2. Install Server Dependencies
   ```bash
   cd server
   npm install
   ```

3. Configure Environment Variables
   Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

## Usage

### Running the Server
1. Start the server:
   ```bash
   cd server
   npm run dev    # for development
   # or
   npm start      # for production
   ```
   The server will start on http://localhost:3000

### Running the Client
1. Open the client/index.html file in your web browser
   - For development, you can use a local server like Live Server
   - For production, the client is served via GitHub Pages

## Folder Structure
```
notaty/
├── client/
│   ├── css/
│   ├── images/
│   ├── index.html
│   ├── note-client.js
│   ├── note-handler.js
│   └── modal-handler.js
├── server/
│   ├── schemas/
│   ├── Database.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Deployment

### Backend Deployment (Render)
The backend is deployed on Render.com. To deploy:
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy using the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`

### Frontend Deployment (GitHub Pages)
The frontend is hosted on GitHub Pages:
1. Enable GitHub Pages in your repository settings
2. Set the source to the client directory
3. Your site will be available at `https://colonal.github.io/Notaty/`

## Contact
For any inquiries or issues, please open an issue on the GitHub repository or contact the maintainers directly.

## License
This project is licensed under the ISC License - see the LICENSE file for details. 