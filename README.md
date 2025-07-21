# MediPath - A guiding path for personalized treatment

## How to Run the Project

1. **Prerequisites**: Ensure Node.js is installed on your system.
2. **Navigate to the project directory**.
3. **Install dependencies**: Run the command:
   > npm install
   
4. **Install `concurrently`**: Run the command:
   > npm install concurrently --save-dev

5. **Update your `package.json`**: Add the following script to your `package.json`:
   ```json
   "scripts": {
     "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
     "start:frontend": "vite",
     "start:backend": "node backend/server.js"
   }
   ```

6. **Start the development servers**: Use the command:
   > npm start



## Project Summary

MediPath is designed to provide personalized treatment guidance. It utilizes modern web technologies to create an interactive and responsive user experience.

### Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Fetch API**: Native browser API for making HTTP requests.
- **Framer Motion**: A library for animations in React.

### How It Works
The project leverages React for component-based architecture, Vite for fast builds and hot module replacement, and Tailwind CSS for styling. The application fetches data using the Fetch API and provides a smooth user experience with animations powered by Framer Motion.

### Architecture Overview
**Frontend (React.js)** 
- User inputs patient data.
- Displays personalized treatment recommendations.
- Calls backend APIs for predictions.

**Backend (Node.js / Express.js)**
- Handles API requests from React.
- Routes data to the Gemini API, which serves as the ML model for generating personalized treatment plans.
- Sends the generated treatment plans back to the frontend.

**ML Model & Processing (Gemini API)**
- The backend sends user input (symptoms, medical history, current condition) to the Gemini API.
- The API processes the input and generates personalized treatment recommendations.
- The response is sent back to the frontend for display.


### Component Overview
- **Home**: Displays the main features of the application, including symptom analysis, AI diagnosis, and treatment plans. It features an image carousel and a navigation button to get started.
- **Navbar**: Provides navigation links to different sections of the application, including Home, Treatment, and Our Team. It also includes a dark mode toggle.
- **Treatment**: Allows users to input their symptoms and medical history, submits the data to the backend, and displays the generated treatment plan.
- **Team**: Showcases the team members involved in the project, including their roles, images, and contact information.
- **Footer**: Displays copyright information for the project.

### Data Flow
1. User enters symptoms in the React UI.
2. React calls the Node.js backend API with the input data.
3. Node.js sends data to the Gemini API to generate personalized treatment plans.
4. The Gemini API processes the data and returns the generated treatment plans.
5. Node.js returns the result to React.
6. React displays personalized treatment plans.

### Tech Stack : 
Component   => 	Technology
Frontend	   =>    React.js (UI), Vite (Build Tool), Tailwind CSS (Styling)
Backend	   =>    Node.js (Express)
ML Model	   =>    Gemini API
Database	   =>    MySQL / MongoDB (if applicable)
APIs	      =>    Fetch API (native browser API), FHIR API, OpenFDA, MedlinePlus, RxNorm
Development Tools => ESLint, Concurrently