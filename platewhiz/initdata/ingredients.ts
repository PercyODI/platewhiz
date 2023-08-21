import Ingredient, { IngredientType } from "../models/ingredient";

export const insertIngredients = async () => {
  const tomato: IngredientType = new Ingredient({
    name: "Tomato",
    typeOf: [],
    density: {
      massVolume: {
        mass: {
          value: 180,
          measurement: "g",
        },
        volume: {
          value: 1,
          measurement: "cup",
        },
      },
    },
    nutrition: {
      servingSize: {
        value: 125,
        measurement: "g",
      },
      calories: 22.5,
      protein: 1.1,
      fat: 0.25,
      carbs: 4.86,
      sugar: 3.29,
      sodium: 6.25,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/1103276/nutrients",
    },
  });

  tomato.save();

  const romaTomato = new Ingredient({
    name: "Roma Tomato",
    typeOf: [tomato._id],
    density: {
      massMeasureless: {
        mass: {
          value: 60,
          measurement: "g",
        },
        measureless: {
          value: 1,
          measurement: "plum tomato",
        },
      },
    },
  });

  romaTomato.save();

  const grapeTomato: IngredientType = new Ingredient({
    name: "Grape Tomato",
    typeOf: [tomato._id],
    density: {
      massMeasureless: {
        mass: {
          value: 8,
          measurement: "g",
        },
        measureless: {
          value: 1,
          measurement: "grape tomato",
        },
      },
    },
  });

  grapeTomato.save();

  const oil = new Ingredient({
    name: "Oil",
    typeOf: [], // This means it is a top level ingredient
    density: {
      massVolume: {
        volume: {
          value: 1,
          measurement: "tbsp",
        },
        mass: {
          value: 14,
          measurement: "g",
        },
      },
    },
  });

  oil.save();

  const evoo = new Ingredient({
    name: "Extra Virgin Olive Oil",
    typeOf: [oil._id],
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "tbsp",
      },
      calories: 119,
      carbs: 0,
      protein: 0,
      fat: 14,
      sodium: 0.28,
      sugar: 0,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/2345743/nutrients",
    },
    density: {
      massVolume: {
        volume: {
          value: 1,
          measurement: "tbsp",
        },
        mass: {
          value: 14,
          measurement: "g",
        },
      },
    },
  });

  await evoo.save()

  const cheese: IngredientType = new Ingredient({
    name: "Cheese",
    typeof: [],
  });

  cheese.save();

  const feta = new Ingredient({
    name: "Feta",
    typeOf: [cheese._id],
    density: {
      massVolume: {
        mass: {
          value: 150,
          measurement: "g",
        },
        volume: {
          value: 1,
          measurement: "cup",
        },
      },
    },
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "cup",
      },
      calories: 398,
      protein: 21.3,
      fat: 32.2,
      carbs: 5.82,
      sugar: 0,
      sodium: 1710,
    },
  });

  feta.save();

  const ricotta = new Ingredient({
    name: "Ricotta",
    typeOf: [cheese._id],
    density: {
      massVolume: {
        volume: {
          value: 1,
          measurement: "cup",
        },
        mass: {
          value: 246,
          measurement: "g",
        },
      },
    },
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "cup",
      },
      calories: 364,
      protein: 23.6,
      fat: 23.3,
      carbs: 14.8,
      sugar: 0.713,
      sodium: 251,
    },
  });

  ricotta.save();

  const freshmint: IngredientType = new Ingredient({
    name: "Fresh Mint",
    typeOf: [],
  });
  freshmint.save();

  const spearmint = new Ingredient({
    name: "Fresh Spearmint",
    typeOf: [freshmint._id],
    nutrition: {
      servingSize: {
        value: 2,
        measurement: "tbsp",
      },
      calories: 5.02,
      protein: 0.375,
      fat: 0.083,
      carbs: 0.959,
      sodium: 3.42,
      sugar: 0,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/173475/nutrients",
    },
    density: {
      massVolume: {
        volume: {
          value: 2,
          measurement: "tbsp",
        },
        mass: {
          value: 11.4,
          measurement: "g",
        },
      },
    },
  });

  spearmint.save();

  const driedmint: IngredientType = new Ingredient({
    name: "Dried Mint",
    typeOf: [],
  });

  driedmint.save();
  const driedspearmint = new Ingredient({
    name: "Dried Spearmint",
    typeOf: [driedmint._id],
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "tsp",
      },
      calories: 1.42,
      protein: 0.099,
      fat: 0.03,
      carbs: 0.26,
      sodium: 1.72,
      sugar: 0,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/172239/nutrients",
    },
    density: {
      massVolume: {
        volume: {
          value: 1,
          measurement: "tsp",
        },
        mass: {
          value: 0.5,
          measurement: "g",
        },
      },
    },
  });

  driedspearmint.save();

  const freshdill = new Ingredient({
    name: "Fresh Dill",
    typeOf: [],
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "cup",
      },
      calories: 3.83,
      protein: 0.308,
      fat: 0.1,
      carbs: 0.625,
      sodium: 5.43,
      sugar: 0,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/172233/nutrients",
    },
    density: {
      massVolume: {
        volume: {
          value: 1,
          measurement: "cup",
        },
        mass: {
          value: 8.9,
          measurement: "g",
        },
      },
    },
  });

  freshdill.save();
  const drieddill = new Ingredient({
    name: "Dried Dill",
    typeOf: [],
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "tsp",
      },
      calories: 2.53,
      protein: 0.2,
      fat: 0.044,
      carbs: 0.558,
      sodium: 2.08,
      sugar: 0,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/171322/nutrients",
    },
    density: {
      massVolume: {
        mass: {
          value: 1,
          measurement: "g",
        },
        volume: {
          value: 1,
          measurement: "tsp",
        },
      },
    },
  });

  drieddill.save();
  const egg = new Ingredient({
    name: "Egg",
    typeOf: [],
    nutrition: {
      servingSize: {
        value: 1,
      },
      calories: 71.9,
      protein: 6.24,
      fat: 5.01,
      carbs: 0.483,
      sugar: 0.101,
      sodium: 64.9,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/748967/nutrients",
    },
    density: {
      massMeasureless: {
        mass: {
          value: 50.3,
          measurement: "g",
        },
        measureless: {
          value: 1,
          measurement: "egg",
        },
      },
    },
  });

  egg.save();
  const phyllo = new Ingredient({
    name: "Phyllo Sheets",
    typeOf: [],
    nutrition: {
      servingSize: {
        value: 1,
      },
      calories: 56.8,
      protein: 1.35,
      fat: 1.14,
      carbs: 9.99,
      sugar: 0.034,
      sodium: 91.8,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/172791/nutrients",
    },
    density: {
      massMeasureless: {
        measureless: {
          value: 1,
          measurement: "sheet",
        },
        mass: {
          value: 19,
          measurement: "g",
        },
      },
    },
  });

  phyllo.save();
  const sesame = new Ingredient({
    name: "Sesame Seeds",
    typeOf: [],
    nutrition: {
      servingSize: {
        value: 1,
        measurement: "tbsp",
      },
      calories: 51.6,
      protein: 1.59,
      fat: 4.47,
      carbs: 2.11,
      sugar: 0.027,
      sodium: 0.99,
      dataLocation:
        "https://fdc.nal.usda.gov/fdc-app.html#/food-details/170150/nutrients",
    },
    density: {
      massVolume: {
        mass: {
          value: 9,
          measurement: "g",
        },
        volume: {
          value: 1,
          measurement: "tbsp",
        },
      },
    },
  });
  sesame.save();
};
