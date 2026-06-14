import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosApi from "../../api/axiosApi";
import MealForm from "../../components/MealForm/MealForm";
import type { MealMutation } from "../../type";

const EditMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<MealMutation | null>(null);

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const response = await axiosApi.get(`/meals/${id}.json`);

        setMeal({
          mealTime: response.data.mealTime,
          description: response.data.description,
          calories: response.data.calories.toString(),
        });
      } catch {
        toast.error("Failed to load meal");
      }
    };

    loadMeal().catch(() => {
      toast.error("Failed to load meal");
    });
  }, [id]);

  const updateMeal = async (mealData: MealMutation) => {
    try {
      await axiosApi.put(`/meals/${id}.json`, {
        ...mealData,
        calories: Number(mealData.calories),
      });

      toast.success("Meal updated");
      navigate("/");
    } catch {
      toast.error("Failed to update meal");
    }
  };

  if (!meal) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Edit Meal</h2>

      <MealForm
        onSubmit={updateMeal}
        existingMeal={meal}
      />
    </>
  );
};

export default EditMeal;