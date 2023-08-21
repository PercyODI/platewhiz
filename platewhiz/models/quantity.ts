import { Schema, model, models } from "mongoose";

export const MassQuantitySchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
      enum: ["g", "lb", "oz"],
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false
  }
);

export const MassQuantity =
  models.MassQuantity || model("MassQuantity", MassQuantitySchema);

const VolumeQuantitySchema = new Schema(
  {
    value: { type: Number, required: true },
    measurement: {
      type: String,
      required: true,
      enum: ["tsp", "tbsp", "cup", "fl oz", "ml", "l"],
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false
  }
);

export const VolumeQuantity =
  models.VolumeQuantity || model("VolumeQuantity", VolumeQuantitySchema);

const MeasurelessQuanitySchema = new Schema(
  {
    value: { type: Number, required: true },
    measurement: {
      type: String, //This is just a human readable string, not used for calculations
      required: false,
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false
  }
);

export const MeasurelessQuanity =
  models.MeasurelessQuanity ||
  model("MeasurelessQuantity", MeasurelessQuanitySchema);

export const DensityQuantitySchema = new Schema(
  {
    massVolume: {
      type: {
        mass: {
          type: MassQuantitySchema,
          required: true,
        },
        volume: {
          type: VolumeQuantitySchema,
          required: true,
        },
      },
      required: false,
      _id: false,
    },
    massMeasureless: {
      type: {
        mass: {
          type: MassQuantitySchema,
          required: true,
        },
        measureless: {
          type: MeasurelessQuanitySchema,
          required: true,
        },
      },
      required: false,
      _id: false,
    },
    volumeMeasureless: {
      type: {
        volume: {
          type: VolumeQuantitySchema,
          required: true,
        },
        measureless: {
          type: MeasurelessQuanitySchema,
          required: true,
        },
      },
      required: false,
      _id: false,
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false
  }
);

export const DensityQuantity =
  models.DensityQuantity || model("DensityQuantity", DensityQuantitySchema);

export const QuantitySchema = new Schema(
  {
    value: { type: Number, required: true },
    measurement: {
      type: String,
      required: false,
      enum: ["tsp", "tbsp", "cup", "g", "lb", "fl oz", "oz"],
    },
  },
  {
    autoCreate: false,
    autoIndex: false,
    _id: false
  }
);

export const Quantity = models.Quantity || model("Quantity", QuantitySchema);
