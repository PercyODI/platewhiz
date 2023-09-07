import { DateTime, Duration } from 'luxon';
import { Schema } from 'mongoose';
import { QuantityType } from './quantity';

// A Blueprint is a combination of recipes that can be used to create a meal.
// A meal is the implementation of a blueprint

const mealTemplateSchema = new Schema({});

const mealSchema = new Schema({});

const testblueprint = {
  components: [
    {
      type: 'recipe',
      name: 'Yogurt with Blueberries', // convert to id
    },
    {
      type: 'ingredient',
      name: 'walnuts',
      prep: 'chopped',
    },
  ],
};

const testmeal = {
  components: [
    {
      type: 'recipe',
      name: 'Yogurt With Blueberries',
      percentage: 1.0,
    },
    {
      type: 'ingredient',
      name: 'chopped walnuts',
      quantity: {
        value: 3,
        measurement: 'tbsp',
      },
    },
  ],
  ingredients: [
    {
      ingredientId: 'walnutIngredient',
      quantity: {
        value: 3,
        measurement: 'tbsp',
      },
    },
    {
      ingredientId: 'greekyogurt',
      quantity: {
        value: 1,
        measurement: 'cup',
      },
    },
    {
      ingredientId: 'blueberries',
      quantity: {
        value: 0.25,
        measurement: 'cup',
      },
    },
  ],
  instructions: [
    {
      line: 'Chop walnuts',
      timeToWait: Duration.fromDurationLike(0),
      timeToComplete: Duration.fromDurationLike({ seconds: 30 }),
    },
    {
      line: 'Place yogurt in a bowl and top with blueberries',
      timeToWait: Duration.fromDurationLike(0),
      timeToComplete: Duration.fromDurationLike({ minutes: 1 }),
    },
  ],
};

// A meal is a possible combination of recipes to make a coherent meal
const meal = {
  mealType: 'breakfast',
  recipes: [],
};

const equalsMealSchema = new Schema({
  meal: {
    type: String,
  },
  recipes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    required: true,
  },
});

const mealSchema = new Schema({
  meal: {
    type: String,
  },
  recipes: {
    type: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: 'Recipe',
        },
        recipeType: {
          type: String,
          enum: ['main', 'side'],
        },
      },
    ],
  },
});

const spaghetti = {
  meal: 'supper',
  recipes: [
    {
      recipeId: '123123123', // Spaghetti,
      recipeType: 'main',
    },
    {
      recipeId: '24123124', // Side salad
      recipeType: 'side',
    },
    {
      recipeId: '838943983498', // Garlic Bread
      recipeType: 'side',
    },
  ],
};

const mealplanPlan = {
  startDate: DateTime.fromISO('2023-08-21'),
  endDate: DateTime.fromISO('2023-08-28'),
  days: [
    {
      date: DateTime.fromISO('2023-08-21'),
      meals: [
        {
          mealType: 'breakfast',
          products: [],
          miseenplas: [],
          recipe: {},
          meal: {
            prep: {
              name: 'Scrambled Eggs',
            },
          },
        },
        {
          mealType: 'lunch',
          meal: {
            prep: {},
          },
        },
      ],
    },
  ],
};

export const MealplanSchema = new Schema({
  startDate: {
    type: Date,
    get: (d: Date) => DateTime.fromJSDate(d),
  },
  endDate: {
    type: Date,
    get: (d: Date) => DateTime.fromJSDate(d),
  },
});
