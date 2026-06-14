export interface Meal {
  mealTime: string;
  description: string;
  calories: number;
}

export interface MealMutation {
  mealTime: string;
  description: string;
  calories: string;
}

export interface MealApi {
  [id: string]: Meal;
}