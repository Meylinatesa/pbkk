const { Recipe } = require("../../models");
const path = require("path");

// Handle POST request to add a new recipe
const resepkuController = {
  async resep(req, res) {
    try {
      console.log("Request received:", req.body);  // Check request body
      console.log("Uploaded file:", req.file);     // Check uploaded file if exists

      // Destructure the recipe data from the request body
      //const { title, description, servings, prepTime, cookTime, totalTime, userEmail } = req.body;
      
      // Parse numeric values
      const prepTime = parseInt(req.body.prepTime);
      const cookTime = parseInt(req.body.cookTime);
      const totalTime = parseInt(req.body.totalTime);
      const servings = parseInt(req.body.servings);

      // Handle the image upload if present
      let imagePath = null;
      if (req.file) {
        // Save the image in a specific directory (e.g., 'uploads')
        imagePath = path.join('uploads', req.file.filename);
      }

      const newRecipe = await Recipe.create({
        title: req.body.title,
        description: req.body.description,
        servings: servings,
        prep_time: prepTime,
        cook_time: cookTime,
        total_time: totalTime,
        image: imagePath,
        email: req.body.email
      });

      // Return a success response with the created recipe data
      res.status(201).json({
        message: "Recipe added successfully",
        recipe: newRecipe,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to add recipe",
        error: error.message,
      });
    }
  }
};

module.exports = resepkuController;
