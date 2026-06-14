import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi.ts";
import MealForm from "../../components/MealForm/MealForm";
import type { MealMutation } from "../../type";

const NewMeal = () => {
  const navigate = useNavigate();

  const createMeal = async (meal: MealMutation) => {
    await axiosApi.post('/meals.json', {
      ...meal,
      calories: Number(meal.calories),
    });

    navigate('/');
  };

  return <MealForm onSubmit={createMeal} />;
};

export default NewMeal;