const { Recipe } = require("../../models");
const path = require("path");

// Handle POST request to add a new recipe
const resepkuController = {
  async resep(req, res) {
    try {
      console.log("Request received:", req.body);  // Log to check request body
      console.log("Uploaded file:", req.file);     // Log to check uploaded file if exists

      // Parse numeric values with default values in case of NaN
      const prepTime = parseInt(req.body.prepTime) || 0;
      const cookTime = parseInt(req.body.cookTime) || 0;
      const totalTime = parseInt(req.body.totalTime) || 0;
      const servings = parseInt(req.body.servings) || 0;

      // Handle the image upload if present
      let imagePath = null;
      if (req.file) {
        // Set the image path relative to where it will be accessible
        imagePath = path.join('/uploads', req.file.filename);
      }

      // Create new recipe with provided data
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
      console.error("Error while adding recipe:", error);
      res.status(500).json({
        message: "Failed to add recipe",
        error: error.message,
      });
    }
  }
};

module.exports = resepkuController;
