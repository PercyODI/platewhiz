import { Schema, model, models } from "mongoose";
import { Quantity, QuantitySchema } from "./quantity";

export const NutritionSchema = new Schema({
  servingSize: {
    type: QuantitySchema,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  dataLocation: {
    type: String,
    required: false,
  },
}, {
  autoCreate: false,
  autoIndex: false
});

const Nutrition = models.Nutrition || model("Nutrition", NutritionSchema);

export default Nutrition;
