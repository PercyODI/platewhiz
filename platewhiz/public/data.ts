import { DateTime, Duration } from 'luxon'

type Meal = {
    recipes: Recipe[],
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

type Nutrition = {
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
    sugar: number,
    salt: number
}

type Product = {
    name?: string,
    brand?: string,
    ingredient: Ingredient,
    nutrition: Nutrition,
    servingSize: Quantity,
}

type Ingredient = {
    name: string
}

type Instruction = {
    line: string,
    timeToComplete: Duration,
    timeToWait?: Duration,
}

type Quantity = {
    quantity: number,
    measurement?: 'tsp' | 'tbsp' | 'cup' | 'g' | 'lb' | 'fl oz' | 'oz',
}

type RecipeIngredient = {
    ingredient: Ingredient,
    quantity: Quantity,
    recipe?: Recipe, // If a RecipeIngredient has a recipe, then it needs to be made first
    preparation?: string
}

type Recipe = {
    name: string,
    description?: string,
    ingredients: (RecipeIngredient | RecipeIngredient[])[],
    instructions: Instruction[],
    categories?: string[],
    rating: number,
    yields: Quantity
    storage: {
        refridgerator?: Duration,
        freezer?: Duration
    }
}

export const recipes: Recipe[] = [{
    name: "Tiropita (Greek Cheese Pie)",
    description: "This savory cheese pie can be enjoyed for breakfast, lunch, or dinner. It features a rich and tangy feta filling wrapped in crispy phyllo dough.",
    ingredients: [{
        ingredient: {
            name: "Extra Virgin Olive Oil",

        },
        quantity: {
            quantity: 4,
            measurement: "tbsp"
        }
    }, {
        ingredient: {
            name: "Feta",
        },
        quantity: {
            quantity: 1,
            measurement: "lb"
        },
        preparation: "crumbled"
    }, {
        ingredient: {
            name: 'ricotta cheese'
        },
        quantity: {
            quantity: 8,
            measurement: "oz"
        },
    }, [{
        ingredient: {
            name: 'fresh mint'
        },
        quantity: {
            quantity: 2,
            measurement: "tbsp"
        },
        preparation: "chopped"
    }, {
        ingredient: {
            name: 'dried mint',
        },
        quantity: {
            quantity: 1,
            measurement: "tbsp"
        }
    }], [{
        ingredient: { name: 'fresh dill' },
        quantity: {
            quantity: 2,
            measurement: "tbsp"
        },
        preparation: "chopped"
    }, {
        ingredient: { name: 'dried dill' },
        quantity: {
            quantity: 1,
            measurement: "tbsp"
        }
    }], {
        ingredient: { name: "egg" },
        quantity: {
            quantity: 3
        },
    }, {
        ingredient: { name: "phyllo sheets" },
        quantity: {
            quantity: 12
        },
        preparation: "defrosted"
    }, {
        ingredient: { name: "sesame seeds" },
        quantity: {
            quantity: 1,
            measurement: "tsp"
        }
    }],
    instructions: [{
        line: "Preheat the oven to 350F. Brush a 9x13-inch casserole dish with olive oil",
        timeToComplete: Duration.fromDurationLike({ minutes: 2 })
    }, {
        line: "Combine the feta and ricotta in a large bowl, using a fork to mash the ingredients together. Add the mint, dill, and black pepper, and mix well. IN a small bowl, beat the eggs and then add them to the cheese mixture along with 1 tbsp olive oil. Mix well.",
        timeToComplete: Duration.fromDurationLike({minutes: 3})
    }, {
        line: "Carefully place 1 phyllo sheet in the bottom of the prepared dish. (Keep the rest of the dough covered with a damp towel.) Brush the sheet with olive oil, then place a second phyllo sheet on top of the first and brush with olive oil. Repeat until you have 6 layers of phyllo",
        timeToComplete: Duration.fromDurationLike({minutes: 5})
    }, {
        line: "Spread the cheese mixture evenly over the phyllo and then fold the excess phyllo edges in and over the mixture.",
        timeToComplete: Duration. fromDurationLike({minutes: 3})
    }, {
        line: "Cover the mixture with 6 more phyllo sheets, repeating the process by placing a single phyllo sheet in the pan and brushing it with olive oil. Roll the excess phyllo in to form an edge around the pie.",
        timeToComplete: Duration.fromDurationLike({minutes: 5})
    }, {
        line: "Brush the top phyllo layer with olive oil and then use a sharp knife to score it into 12 peices, being careful to cut through the first 3-4 layers of the phyllo dough. Sprinkle the sesame seeds and abit of water over the top of the pie.",
        timeToComplete: Duration.fromDurationLike({minutes: 4})
    }, {
        line: "Place the pie in the middle rack of the oven. Bake for 40 minutes or until the phyllo turns a deep golden color. Carefully lift one side of the pie to ensure the bottom crust is baked.",
        timeToComplete: Duration.fromDurationLike({minutes: 1}),
        timeToWait: Duration.fromDurationLike({minutes: 40})
    }, {
        line: "Once it is baked, move the pan to the bottom rack and bake for an additional 5 minutes",
        timeToComplete: Duration.fromDurationLike({seconds: 30}),
        timeToWait: Duration.fromDurationLike({minutes: 5})
    }, {
        line: "Remove the pie from the oven and set aside to cool for 15 minutes.",
        timeToComplete: Duration.fromDurationLike({seconds: 30}),
        timeToWait: Duration.fromDurationLike({minutes: 15})
    }, {
        line: "Use a sharp knife to cut the pie into 12 pieces. Store covered in the refridgerator for up to 3 days",
        timeToComplete: Duration.fromDurationLike({minutes: 3})
    }],
    categories: ["savory pie"],
    rating: 5,
    yields: {quantity: 12},
    storage: {
        refridgerator: Duration.fromDurationLike({days: 3})
    }
}
]