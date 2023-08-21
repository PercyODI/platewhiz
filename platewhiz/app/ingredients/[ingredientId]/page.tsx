"use client";

import { IngredientModel, ingredients } from "@/public/data";
import React, { useEffect, useState } from "react";

const Ingredient = ({ params }: { params: { ingredientId: string } }) => {
  const [ingredient, setIngredient] = useState<IngredientModel | undefined>(
    undefined
  );
  useEffect(() => {
    const getIngredient = async () => {
      const foundIngredient = ingredients.find(
        (i) => i._id === params.ingredientId
      );

      setIngredient(foundIngredient);
    };

    getIngredient();
  }, []);

  return (
    <div>
      <h2>{ingredient?.name}</h2>
      <p>Id: {ingredient?._id}</p>
      {ingredient?.nutrition && (
        <div>
          <p>Nutrition:</p>
          <p>
            (Per {ingredient?.nutrition.servingSize.value}{" "}
            {ingredient?.nutrition.servingSize.measurement})
          </p>
          <p>Calories: {ingredient?.nutrition.calories}</p>
          <p>Protein: {ingredient?.nutrition.protein} g</p>
          <p>Fat: {ingredient?.nutrition.fat} g</p>
          <p>Carbs: {ingredient?.nutrition.carbs} g</p>
          <p>Sugar: {ingredient?.nutrition.sugar} g</p>
          <p>Salt(Sodium): {ingredient?.nutrition.sodium} mg</p>
        </div>
      )}
    </div>
  );
};

export default Ingredient;
