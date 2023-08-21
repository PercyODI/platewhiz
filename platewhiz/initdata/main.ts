import { connectMongooseDb } from "../utils/mongodb";
import { insertIngredients } from "./ingredients";
import { insertRecipes } from "./recipes";

(async () => {
  await connectMongooseDb();

  await insertIngredients();
  await insertRecipes();

  console.log("Done!");
  return;
})();
