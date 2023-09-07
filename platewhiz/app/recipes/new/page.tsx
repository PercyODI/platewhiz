'use client';

import PreviousMap from 'postcss/lib/previous-map';
import { stringify } from 'querystring';
import React, { useState } from 'react';

const NewRecipe = () => {
  const [newRecipe, setNewRecipe] = useState<{
    title: string;
    ingredients: {
      id: string;
      quantity: {
        value: number;
        measurement: string;
      };
    }[];
  }>({ title: '', ingredients: [] });

  function ingredientInputs(i?: { id: string; quantity: { value: number; measurement: string } }) {
    if (!i) {
      i = {
        id: '',
        quantity: {
          value: 0,
          measurement: '',
        },
      };
    }
    return (
      <div>
        <input
          type="number"
          value={i.quantity.toString()}
          onChange={(e) => setNewRecipe(prev => ({...prev, }))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          value={i.id}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    );
  }
  return (
    <div>
      <h2>Make a new recipe</h2>
      <p>Title</p>
      <input
        type="text"
        value={newRecipe.title}
        onChange={(e) => setNewRecipe((prev) => ({ ...prev, title: e.target.value }))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p>Ingredients</p>
      {newRecipe.ingredients.map((i) => ingredientInputs(i))}
      {ingredientInputs()}
    </div>
  );
};

export default NewRecipe;
