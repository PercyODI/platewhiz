import { DateTime } from "luxon";
import { Schema } from "mongoose";

const MealSchema = new Schema({});

const mealplan = {
  startDate: DateTime.fromISO("2023-08-21"),
  endDate: DateTime.fromISO("2023-08-28"),
  days: [
    {
      date: DateTime.fromISO("2023-08-21"),
      meals: [
        {
          mealType: "breakfast",
          products: [],
          miseenplas: [],
          recipe: {},
          meal: {
            prep: {
              name: "Scrambled Eggs",
            },
          },
        },
        {
          mealType: "lunch",
          meal: {
            prep: {

            }
          }
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
