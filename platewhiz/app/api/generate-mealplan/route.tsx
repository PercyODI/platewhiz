import { Recipe, RecipeType } from "@/models/recipe"
import { connectMongooseDb } from "@/utils/mongodb"

const hardcodedDetails = {
    calorieGoal: 2300,

}

export const POST = async (request: Request) => {
    // Fetch all recipes from the database
    connectMongooseDb()

    const recipes: RecipeType[] = await Recipe.find({})
    // Score each recipe using ??? 
    while()
    // pick top recipe to be the next picked recipe

    // save recipe to mealplan in db

    // do it again until all meals are accounted for

}