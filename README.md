# Recipe Hub - Recipe Management Application

A full-stack recipe management application built with React and Node.js that allows users to create, manage, and share their favorite recipes.

## Features

- 👤 User authentication (Register/Login)
- 📝 Create, edit, and delete recipes
- 🔍 Search recipes by name
- 🏷️ Filter recipes by category
- ⏱️ Track preparation and cooking times
- 👥 Manage servings information
- 📱 Responsive design for all devices

## Frontend Setup

1. Clone this repository:
```bash
git clone <your-frontend-repo-url>
cd recipe-hub-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add:
```
REACT_APP_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3001`

## Backend Repository

The backend code is available at: [Recipe Hub Backend](https://github.com/yourusername/recipe-hub-backend)

### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/Yolanda-landii/Mongo_NodeRecipeApp/tree/mongoRecipeApp
cd recipe-hub-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory with:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the backend server:
```bash
node App.js
```

## Technologies Used

### Frontend
- React
- React Router DOM
- Axios
- CSS3 with modern features

### Backend
- Node.js
- Express.js
- MongoDB


## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login user

### Recipes
- GET `/recipes` - Get all recipes
- GET `/recipes/:id` - Get a specific recipe
- POST `/recipes` - Create a new recipe
- PATCH `/recipes/:id` - Update a recipe
- DELETE `/recipes/:id` - Delete a recipe

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/recipe-hub-frontend](https://github.com/yourusername/recipe-hub-frontend)
