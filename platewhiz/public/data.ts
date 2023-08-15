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

type IngredientModel = {
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

type DensityQuantity = {
    mass?: {
        value: number,
        measurement: "g" | "lb" | "oz"
    },
    volume?: {
        value: number,
        measurement: "tsp" | "tbsp" | "cup" | "fl oz" | "ml" | "l"
    },
    measurementless?: {
        value: number,
        measurement?: string //This is just a human readable string, not used for calculations
    }
}

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
        ingredient: {
            name: 'fresh mint'
        },
        quantity: {
            value: 2,
            measurement: "tbsp"
        },
        preparation: "chopped"
    }, {
        ingredient: {
            name: 'dried mint',
        },
        quantity: {
            value: 1,
            measurement: "tbsp"
        }
    }], [{
        ingredient: { name: 'fresh dill' },
        quantity: {
            value: 2,
            measurement: "tbsp"
        },
        preparation: "chopped"
    }, {
        ingredient: { name: 'dried dill' },
        quantity: {
            value: 1,
            measurement: "tbsp"
        }
    }], {
        ingredient: { name: "egg" },
        quantity: {
            value: 3
        },
    }, {
        ingredient: { name: "phyllo sheets" },
        quantity: {
            value: 12
        },
        preparation: "defrosted"
    }, {
        ingredient: { name: "sesame seeds" },
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
        mass: {
            value: 180,
            measurement: "g"
        },
        volume: {
            value: 1,
            measurement: "cup"
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
        mass: {
            value: 60,
            measurement: "g"
        },
        measurementless: {
            value: 1,
            measurement: "plum tomato"
        }
    }
}, {
    _id: "grapetomato",
    name: "Grape Tomato",
    typeOf: ["tomato"],
    density: {
        mass: {
            value: 8,
            measurement: "g"
        },
        measurementless: {
            value: 1,
            measurement: "grape tomato"
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
        volume: {
            value: 1,
            measurement: "tbsp"
        },
        mass: {
            value: 14,
            measurement: "g"
        }
    },
}, {
    _id: "oil",
    name: "oil",
    typeOf: [], // This means it is a top level ingredient
    density: {
        volume: {
            value: 1,
            measurement: "tbsp"
        },
        mass: {
            value: 14,
            measurement: "g"
        }
    },
}, {
    _id: "feta",
    name: "Feta",
    typeOf: ['cheese'],
    density: {
        mass: {
            value: 150,
            measurement: "g"
        },
        volume: {
            value: 1,
            measurement: "cup"
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
        volume: {
            value: 1,
            measurement: "cup"
        },
        mass: {
            value: 246,
            measurement: "g"
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
    typeOf: []
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
}]