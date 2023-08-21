"use client";

import {
  recipes,
  RecipeModel,
  IngredientModel,
  ingredients as ingredientsData,
} from "@/public/data";

import React, { useEffect, useState } from "react";

const Recipe = ({ params }: { params: { recipeId: string } }) => {
  const [recipe, setRecipe] = useState<RecipeModel | undefined>(undefined);
  const [ingredients, setIngredients] = useState<IngredientModel[] | undefined>(
    undefined
  );

  useEffect(() => {
    const getRecipe = async () => {
      const foundRecipe = recipes.find((r) => r._id === params.recipeId);

      setRecipe(foundRecipe);
    };

    getRecipe();
  }, [params.recipeId]);

  useEffect(() => {
    const getIngredients = async () => {
      const foundIngredients = ingredientsData
        .filter((i) =>
          recipe?.ingredients.map((ingredient) => {
            let ingArray = [];
            if (Array.isArray(ingredient)) {
              ingArray = ingredient;
            } else {
              ingArray = [ingredient];
            }

            return ingArray;
          })
        )
        .flat();

      setIngredients(foundIngredients);
    };

    getIngredients();
  }, [recipe]);

  function findIngredientById(
    ingredientId: string
  ): IngredientModel | undefined {
    return ingredients?.find((i) => i._id === ingredientId);
  }

  return (
    <div>
      {recipe && (
        <>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <h3>Ingredients: </h3>
          {/* {JSON.stringify(recipe.variations[0].ingredients)} */}
          <ul className="text-xs list-disc pl-3">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>
                {!Array.isArray(ingredient) && (
                  <>
                    {ingredient.quantity.value}{" "}
                    {ingredient.quantity.measurement} {ingredient.ingredientId}{" "}
                    | {findIngredientById(ingredient.ingredientId)?.name} {""}
                    {ingredient.preparation && <>({ingredient.preparation})</>}
                  </>
                )}
                {Array.isArray(ingredient) &&
                  ingredient.map((innerIngredient, j) => (
                    <>
                      {innerIngredient.quantity.value}{" "}
                      {innerIngredient.quantity.measurement}{" "}
                      {innerIngredient.ingredientId} |{" "}
                      {findIngredientById(innerIngredient.ingredientId)?.name}{" "}
                      {innerIngredient.preparation && (
                        <>({innerIngredient.preparation})</>
                      )}
                      {j < ingredient.length - 1 && <> or </>}
                    </>
                  ))}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <ol className="list-decimal text-xs pl-4">
            {recipe.instructions.map((instruction, i) => (
              <li key={i}>{instruction.line}</li>
            ))}
          </ol>
          <pre>{JSON.stringify(recipe ?? "Nothing here boss.", null, 2)}</pre>
        </>
      )}
      {!recipe && <h1 className="bg-red-500">Nothing here!</h1>}
    </div>
  );
};

export default Recipe;
