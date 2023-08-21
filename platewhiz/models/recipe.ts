import { Document, InferSchemaType, Schema, model, models } from "mongoose";
import { QuantitySchema } from "./quantity";

export const RecipeIngredientSchema = new Schema(
  {
    ingredientId: {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
    quantity: {
      type: QuantitySchema,
      required: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: false,
    }, // If a RecipeIngredient has a recipe, then it needs to be made first
    preparation: {
      type: String,
      required: false,
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false,
  }
);

// export const RecipeIngredient =
//   models.RecipeIngredient || model("RecipeIngredient", RecipeIngredientSchema);

export const InstructionSchema = new Schema(
  {
    line: {
      type: String,
      required: true,
    },
    timeToComplete: {
      type: String,
      required: true,
    },
    timeToWait: {
      type: String,
      required: false,
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false,
  }
);

// export const Instruction =
//   models.Instruction || model("Instruction", InstructionSchema);

export const RecipeSchema = new Schema({
  name: String,
  description: String,
  meals: {
    type: [String],
    enum: [
      "breakfast",
      "morning snack",
      "lunch",
      "afternoon snack",
      "dinner",
      "dessert",
    ],
  },
  categories: [String],
  ingredients: [[RecipeIngredientSchema]],
  instructions: [InstructionSchema],
  rating: Number,
  yields: QuantitySchema,
  storage: {
    refridgerator: {
      type: String,
      required: false,
    },
    freezer: {
      type: String,
      required: false,
    },
  },
});
export type RecipeType = InferSchemaType<typeof RecipeSchema> & Document;

export const Recipe = models.Recipe || model("Recipe", RecipeSchema);
