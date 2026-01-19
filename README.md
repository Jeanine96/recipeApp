# RecipeApp

Recipe Web App is a simple web application built with Vue 3 to explore, view, and save recipes. Users can browse a list of recipes, see detailed cooking instructions, and manage their favorite recipes. This project was created as a learning exercise to practice working with a database and building reactive interfaces in Vue 3.

## Installation

The recipe webapp is made in Vue.js 3 (version: ^3.5.26) and connected with a Firebase database (version: ^12.7.0).

### Clone the repository

```sh
git clone https://github.com/yourusername/recipeApp.git
```

### Navigate to project directory

```sh
cd recipeApp
```

### Install dependencies

```sh
npm install
```

### Run development server

```sh
npm run dev
```

## Project Structure

```
recipeApp/
├── eslint.config.js          # ESLint configuration
├── index.html                # Main HTML entry point
├── jsconfig.json             # JavaScript configuration
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
├── vite.config.js            # Vite configuration
├── public/                   # Static assets
└── src/                      # Source code
    ├── App.vue               # Root Vue component
    ├── main.js               # Application entry point
    ├── vuetify.js            # Vuetify configuration
    ├── assets/               # Static assets (CSS, images)
    │   └── main.css          # Main stylesheet
    ├── components/           # Reusable Vue components
    │   ├── BottomNavigationBar.vue
    │   ├── FavoriteButton.vue
    │   ├── FavoriteCard.vue
    │   ├── PortionCounter.vue
    │   └── RecipeCard.vue
    ├── firebase/             # Firebase integration
    │   ├── favoriteService.js
    │   └── firebase.js       # Firebase configuration
    ├── router/               # Vue Router configuration
    │   └── index.js
    └── views/                # Page-level components
        ├── FavoriteListView.vue
        ├── RecipeDetailView.vue
        └── RecipeView.vue
```

## Usage

The recipe webapp is suitable for mobile

## Roadmap

Planned improvements for upcoming versions include:

- Filter meals by category or type
- Search bar to find specific recipes
- Grocery list to organize ingredients
- Weekly meal planner
- User-created recipes
- Import recipes from external websites
- Edit ingredients and instructions
- Organize favorite recipes into folders
- Calorie tracker for each meal
- AI-generated recipes based on available ingredients

## License

This project is provided for **educational purposes only**.  
You may view and study the code, but **modifying, redistributing, or using it in other projects is prohibited**.

### Font

- **[Inter](https://fonts.google.com/specimen/Inter)** – Designed by Rasmus Andersson  
  **License:** SIL Open Font License (OFL) 1.1 – free for personal and commercial use  
  [Full License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)
