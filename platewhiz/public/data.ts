import { DateTime, Duration } from 'luxon'

type Meal = {
  recipes: RecipeModel[],
}

type MealPlanDay = {
  breakfast: Meal,
  morningSnack: Meal,
  Lunch: Meal,
  afternoonSnack: Meal,
  dinner: Meal,
}

type MealPlan = {
  days: MealPlanDay[],
  startDate: DateTime,
  endDate: DateTime,
}

/* Nutrition is complicated :(

   Nutrition will be gathered in this order.
   The first not-null value will be used.

   ProductModel -> Ingredient -> Ingredient typeOf's Ingredient

   servingSize: The serving size is an array of equivalent quantities
   that make up the values in the nutrition model. These arrays will provide 
   density values for calculations. If a lower model doesn't have a 
   measurement for a density calculation, it moves up the order tree.

   All top level ingredients should have a weight and a volume serving size
*/
type Nutrition = {
  servingSize: Quantity,
  calories: number,
  protein: number,
  fat: number,
  carbs: number,
  sugar: number,
  sodium: number,
  dataLocation?: string,
}

type StorePricing = {
  store: "HyVee" | "Farmer's Market",
  price: number,
  quantity?: Quantity,
}


type ProductModel = {
  _id: string,
  name?: string,
  brand?: string,
  ingredientId: string,
  nutrition?: Nutrition,
  totalQuantity: Quantity,
  price?: StorePricing[],
}

export type IngredientModel = {
  _id: string,
  name: string,
  typeOf: string[],
  nutrition?: Nutrition,
  density?: DensityQuantity,
}

type Instruction = {
  line: string,
  timeToComplete: Duration,
  timeToWait?: Duration,
}

type Quantity = {
  value: number,
  measurement?: 'tsp' | 'tbsp' | 'cup' | 'g' | 'lb' | 'fl oz' | 'oz',
}

type MassQuantity = {
  value: number,
  measurement: "g" | "lb" | "oz"
}

type VolumeQuantity = {
  value: number,
  measurement: "tsp" | "tbsp" | "cup" | "fl oz" | "ml" | "l"
}

type MeasurelessQuanity = {
  value: number,
  measurement?: string //This is just a human readable string, not used for calculations
}

type DensityQuantity = {
  massVolume?: {
    mass: MassQuantity,
    volume: VolumeQuantity
  },
  massMeasureless?: {
    mass: MassQuantity,
    measureless: MeasurelessQuanity,
  },
  volumeMeasureless?: {
    volume: VolumeQuantity,
    measureless: MeasurelessQuanity,
  }
}


// type DensityQuantity = {
//     mass?: {
//         value: number,
//         measurement: "g" | "lb" | "oz"
//     },
//     volume?: {
//         value: number,
//         measurement: "tsp" | "tbsp" | "cup" | "fl oz" | "ml" | "l"
//     },
//     measurementless?: {
//         value: number,
//         measurement?: string //This is just a human readable string, not used for calculations
//     }
// }

type RecipeIngredient = {
  ingredientId: string,
  quantity: Quantity,
  recipe?: RecipeModel, // If a RecipeIngredient has a recipe, then it needs to be made first
  preparation?: string
}

export type RecipeModel = {
  _id: string,
  name: string,
  description?: string,
  meals: ("breakfast" | "morning snack" | "lunch" | "afternoon snack" | "dinner" | "dessert")[],
  categories?: string[],
  ingredients: (RecipeIngredient | RecipeIngredient[])[],
  instructions: Instruction[],
  rating: number,
  yields: Quantity
  storage: {
    refridgerator?: Duration,
    freezer?: Duration
  }
}

export const recipes: RecipeModel[] = [{
  _id: "1",
  name: "Tiropita (Greek Cheese Pie)",
  description: "This savory cheese pie can be enjoyed for breakfast, lunch, or dinner. It features a rich and tangy feta filling wrapped in crispy phyllo dough.",
  meals: ["breakfast", "lunch", "dinner"],
  categories: ["savory pie"],
  ingredients: [{
    ingredientId: "evoo",
    quantity: {
      value: 4,
      measurement: "tbsp"
    }
  }, {
    ingredientId: "feta",
    quantity: {
      value: 1,
      measurement: "lb"
    },
    preparation: "crumbled"
  }, {
    ingredientId: "ricotta",
    quantity: {
      value: 8,
      measurement: "oz"
    },
  }, [{
    ingredientId: "freshmint",
    quantity: {
      value: 2,
      measurement: "tbsp"
    },
    preparation: "chopped"
  }, {
    ingredientId: "driedmint",
    quantity: {
      value: 1,
      measurement: "tbsp"
    }
  }], [{
    ingredientId: "freshdill",
    quantity: {
      value: 2,
      measurement: "tbsp"
    },
    preparation: "chopped"
  }, {
    ingredientId: "drieddill",
    quantity: {
      value: 1,
      measurement: "tbsp"
    }
  }], {
    ingredientId: "egg",
    quantity: {
      value: 3
    },
  }, {
    ingredientId: "phyllo",
    quantity: {
      value: 12
    },
    preparation: "defrosted"
  }, {
    ingredientId: "sesameseeds",
    quantity: {
      value: 1,
      measurement: "tsp"
    }
  }],
  instructions: [{
    line: "Preheat the oven to 350F. Brush a 9x13-inch casserole dish with olive oil",
    timeToComplete: Duration.fromDurationLike({ minutes: 2 })
  }, {
    line: "Combine the feta and ricotta in a large bowl, using a fork to mash the ingredients together. Add the mint, dill, and black pepper, and mix well. IN a small bowl, beat the eggs and then add them to the cheese mixture along with 1 tbsp olive oil. Mix well.",
    timeToComplete: Duration.fromDurationLike({ minutes: 3 })
  }, {
    line: "Carefully place 1 phyllo sheet in the bottom of the prepared dish. (Keep the rest of the dough covered with a damp towel.) Brush the sheet with olive oil, then place a second phyllo sheet on top of the first and brush with olive oil. Repeat until you have 6 layers of phyllo",
    timeToComplete: Duration.fromDurationLike({ minutes: 5 })
  }, {
    line: "Spread the cheese mixture evenly over the phyllo and then fold the excess phyllo edges in and over the mixture.",
    timeToComplete: Duration.fromDurationLike({ minutes: 3 })
  }, {
    line: "Cover the mixture with 6 more phyllo sheets, repeating the process by placing a single phyllo sheet in the pan and brushing it with olive oil. Roll the excess phyllo in to form an edge around the pie.",
    timeToComplete: Duration.fromDurationLike({ minutes: 5 })
  }, {
    line: "Brush the top phyllo layer with olive oil and then use a sharp knife to score it into 12 peices, being careful to cut through the first 3-4 layers of the phyllo dough. Sprinkle the sesame seeds and abit of water over the top of the pie.",
    timeToComplete: Duration.fromDurationLike({ minutes: 4 })
  }, {
    line: "Place the pie in the middle rack of the oven. Bake for 40 minutes or until the phyllo turns a deep golden color. Carefully lift one side of the pie to ensure the bottom crust is baked.",
    timeToComplete: Duration.fromDurationLike({ minutes: 1 }),
    timeToWait: Duration.fromDurationLike({ minutes: 40 })
  }, {
    line: "Once it is baked, move the pan to the bottom rack and bake for an additional 5 minutes",
    timeToComplete: Duration.fromDurationLike({ seconds: 30 }),
    timeToWait: Duration.fromDurationLike({ minutes: 5 })
  }, {
    line: "Remove the pie from the oven and set aside to cool for 15 minutes.",
    timeToComplete: Duration.fromDurationLike({ seconds: 30 }),
    timeToWait: Duration.fromDurationLike({ minutes: 15 })
  }, {
    line: "Use a sharp knife to cut the pie into 12 pieces. Store covered in the refridgerator for up to 3 days",
    timeToComplete: Duration.fromDurationLike({ minutes: 3 })
  }],
  rating: 5,
  yields: { value: 12 },
  storage: {
    refridgerator: Duration.fromDurationLike({ days: 3 })
  }
}]

export const ingredients: IngredientModel[] = [{
  _id: "tomato",
  name: "Tomato",
  typeOf: [],
  density: {
    massVolume: {
      mass: {
        value: 180,
        measurement: "g"
      },
      volume: {
        value: 1,
        measurement: "cup"
      }
    }
  },
  nutrition: {
    servingSize: {
      value: 125,
      measurement: "g"
    },
    calories: 22.5,
    protein: 1.1,
    fat: 0.25,
    carbs: 4.86,
    sugar: 3.29,
    sodium: 6.25,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/1103276/nutrients"
  }
}, {
  _id: "romatomato",
  name: "Roma Tomato",
  typeOf: ["tomato"],
  density: {
    massMeasureless: {
      mass: {
        value: 60,
        measurement: "g"
      },
      measureless: {
        value: 1,
        measurement: "plum tomato"
      }
    }
  }
}, {
  _id: "grapetomato",
  name: "Grape Tomato",
  typeOf: ["tomato"],
  density: {
    massMeasureless: {
      mass: {
        value: 8,
        measurement: "g"
      },
      measureless: {
        value: 1,
        measurement: "grape tomato"
      }
    }
  }
}, {
  _id: "evoo",
  name: "Extra Virgin Olive Oil",
  typeOf: ["oil"],
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "tbsp"
    },
    calories: 119,
    carbs: 0,
    protein: 0,
    fat: 14,
    sodium: 0.28,
    sugar: 0,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/2345743/nutrients",
  },
  density: {
    massVolume: {
      volume: {
        value: 1,
        measurement: "tbsp"
      },
      mass: {
        value: 14,
        measurement: "g"
      }
    }
  },
}, {
  _id: "oil",
  name: "oil",
  typeOf: [], // This means it is a top level ingredient
  density: {
    massVolume: {
      volume: {
        value: 1,
        measurement: "tbsp"
      },
      mass: {
        value: 14,
        measurement: "g"
      }
    }
  },
}, {
  _id: "feta",
  name: "Feta",
  typeOf: ['cheese'],
  density: {
    massVolume: {
      mass: {
        value: 150,
        measurement: "g"
      },
      volume: {
        value: 1,
        measurement: "cup"
      }
    }
  },
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "cup"
    },
    calories: 398,
    protein: 21.3,
    fat: 32.2,
    carbs: 5.82,
    sugar: 0,
    sodium: 1710
  }
}, {
  _id: "ricotta",
  name: "Ricotta",
  typeOf: ['cheese'],
  density: {
    massVolume: {
      volume: {
        value: 1,
        measurement: "cup"
      },
      mass: {
        value: 246,
        measurement: "g"
      }
    }
  },
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "cup"
    },
    calories: 364,
    protein: 23.6,
    fat: 23.3,
    carbs: 14.8,
    sugar: 0.713,
    sodium: 251
  }
}, {
  _id: "freshmint",
  name: "Fresh Spearmint",
  typeOf: ["freshmint"],
  nutrition: {
    servingSize: {
      value: 2,
      measurement: "tbsp"
    },
    calories: 5.02,
    protein: 0.375,
    fat: 0.083,
    carbs: 0.959,
    sodium: 3.42,
    sugar: 0,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/173475/nutrients"
  },
  density: {
    massVolume: {
      volume: {
        value: 2,
        measurement: "tbsp"
      },
      mass: {
        value: 11.4,
        measurement: "g"
      }
    }
  }
}, {
  _id: "freshmint",
  name: "Fresh Mint",
  typeOf: []
}, {
  _id: "driedmint",
  name: "Dried Mint",
  typeOf: []
}, {
  _id: "driedspearmint",
  name: "Dried Spearmint",
  typeOf: ["driedmint"],
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "tsp"
    },
    calories: 1.42,
    protein: 0.099,
    fat: 0.03,
    carbs: 0.26,
    sodium: 1.72,
    sugar: 0,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/172239/nutrients"
  },
  density: {
    massVolume: {
      volume: {
        value: 1,
        measurement: "tsp"
      },
      mass: {
        value: 0.5,
        measurement: "g"
      }
    }
  }
}, {
  _id: "freshdill",
  name: "Fresh Dill",
  typeOf: [],
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "cup"
    },
    calories: 3.83,
    protein: 0.308,
    fat: 0.1,
    carbs: 0.625,
    sodium: 5.43,
    sugar: 0,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/172233/nutrients"
  },
  density: {
    massVolume: {
      volume: {
        value: 1,
        measurement: "cup"
      },
      mass: {
        value: 8.9,
        measurement: "g"
      }
    }
  }
}, {
  _id: "drieddill",
  name: "Dried Dill",
  typeOf: [],
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "tsp"
    },
    calories: 2.53,
    protein: 0.2,
    fat: 0.044,
    carbs: 0.558,
    sodium: 2.08,
    sugar: 0,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/171322/nutrients"
  },
  density: {
    massVolume: {
      mass: {
        value: 1,
        measurement: "g"
      },
      volume: {
        value: 1,
        measurement: "tsp"
      }
    }
  }
}, {
  _id: "egg",
  name: "Egg",
  typeOf: [],
  nutrition: {
    servingSize: {
      value: 1
    },
    calories: 71.9,
    protein: 6.24,
    fat: 5.01,
    carbs: 0.483,
    sugar: 0.101,
    sodium: 64.9,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/748967/nutrients"
  },
  density: {
    massMeasureless: {
      mass: {
        value: 50.3,
        measurement: "g"
      },
      measureless: {
        value: 1,
        measurement: "egg"
      }
    }
  }
}, {
  _id: "phyllo",
  name: "Phyllo Sheets",
  typeOf: [],
  nutrition: {
    servingSize: {
      value: 1
    },
    calories: 56.8,
    protein: 1.35,
    fat: 1.14,
    carbs: 9.99,
    sugar: 0.034,
    sodium: 91.8,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/172791/nutrients"
  },
  density: {
    massMeasureless: {
      measureless: {
        value: 1,
        measurement: "sheet"
      },
      mass: {
        value: 19,
        measurement: "g"
      }
    }
  }
}, {
  _id: "sesameseeds",
  name: "Sesame Seeds",
  typeOf: [],
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "tbsp"
    },
    calories: 51.6,
    protein: 1.59,
    fat: 4.47,
    carbs: 2.11,
    sugar: 0.027,
    sodium: 0.99,
    dataLocation: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/170150/nutrients"
  },
  density: {
    massVolume: {
      mass: {
        value: 9,
        measurement: "g"
      },
      volume: {
        value: 1,
        measurement: 'tbsp'
      }
    }
  }
}]

export const products: ProductModel[] = [{
  _id: "caliranchevoo",
  ingredientId: "evoo",
  name: "California Olive Oil Ranch Medium Extra Virgin Olive Oil 16.9 fl oz",
  brand: "California Olive Ranch",
  nutrition: {
    servingSize: {
      value: 1,
      measurement: "tbsp"
    },
    calories: 130,
    carbs: 0,
    fat: 14,
    protein: 0,
    sodium: 0,
    sugar: 0,
  },
  totalQuantity: {
    value: 16.9,
    measurement: "fl oz"
  },
  price: [{
    price: 13.19,
    store: "HyVee"
  }]
}, {
  _id: "athenosfeta4oz",
  ingredientId: "feta",
  name: "Athenos Crumbled Traditional Feta Cheese, 4 oz",
  brand: "Athenos",
  nutrition: {
    servingSize: {
      value: 0.25,
      measurement: "cup"
    },
    calories: 70,
    fat: 6,
    carbs: 1,
    protein: 4,
    sodium: 320,
    sugar: 0
  },
  totalQuantity: {
    value: 4,
    measurement: "oz"
  },
  price: [{
    price: 4.99,
    store: "HyVee"
  }]
}, {
  _id: "athensphyllo",
  ingredientId: "phyllo",
  name: "Athens Phyllo Pastry Sheets Fillo Dough 2Ct",
  brand: "Athens",
  nutrition: {
    servingSize: {
      value: 5
    },
    calories: 180,
    protein: 5,
    fat: 1,
    carbs: 36,
    sodium: 170,
    sugar: 2,
  },
  totalQuantity: {
    value: 5
  },
  price: [{
    price: 7.39,
    store: "HyVee"
  }]
}]