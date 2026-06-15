export interface Meal {
  mealTime: string;
  description: string;
  calories: number;
  date: string;
}

export interface MealMutation {
  mealTime: string;
  description: string;
  calories: string;
  date: string;
}

export interface MealApi {
  [id: string]: Meal;
}