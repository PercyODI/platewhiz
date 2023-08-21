import { Document, InferSchemaType, Schema, model, models } from "mongoose";
import { NutritionSchema } from "./nutrition";
import { DensityQuantitySchema } from "./quantity";

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  typeOf: {
    type: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
    required: true,
  },
  nutrition: {
    type: NutritionSchema,
    required: false,
  },
  density: {
    type: DensityQuantitySchema,
    required: false,
  },
});

const Ingredient = models.Ingredient || model("Ingredient", IngredientSchema);

export default Ingredient;

export type IngredientType = InferSchemaType<typeof IngredientSchema> &
  Document;
