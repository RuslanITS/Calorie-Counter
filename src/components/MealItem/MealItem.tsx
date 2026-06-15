import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Card, Badge, Button } from 'react-bootstrap';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import axiosApi from "../../api/axiosApi.ts";
import './MealItem.css';

export interface Meal {
  id: string;
  mealTime: string;
  description: string;
  calories: number;
  date: string;
}

const MealItem = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMeals = async () => {
    try {
      setLoading(true);

      const response = await axiosApi.get("/meals.json");

      if (!response.data) {
        setMeals([]);
        return;
      }

      const postMeal: Meal[] = Object.keys(response.data).map((id) => ({
        id,
        ...response.data[id],
      }));

      postMeal.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime(),
      );

      setMeals(postMeal);
    } catch {
      toast.error("Failed to load meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMeals = async () => {
      await fetchMeals();
    };

    loadMeals().catch(() => {
      toast.error('Failed to load meals');
    });
  }, []);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const totalCalories = meals
    .filter((meal) => meal.date === today)
    .reduce(
      (acc, meal) =>
        acc + meal.calories,
      0
    );

  const deleteMeal = async (id: string) => {
    try {
      setDeletingId(id);

      await axiosApi.delete(`/meals/${id}.json`);

      toast.success("Meal deleted");

      await fetchMeals();
    } catch {
      toast.error("Failed to delete meal");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="text-center">
      <h4 className="text-center mt-5">
        No meals yet
      </h4>
        <NavLink
          to="/meals/new"
          className="nav-link-reset"
        >
          <Button
            size="lg"
            className="px-4 shadow add-meal-btn"
          >
            + Add Meal
          </Button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="container py-4 meals-wrapper">
      <Card className="border-0 shadow-lg mb-4 calories-card">
        <Card.Body className="p-4 text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-light opacity-75 mb-2">
                DAILY CALORIES
              </h6>

              <h1 className="fw-bold mb-0">
                {totalCalories}
                <small className="ms-2 fs-6 fw-normal">
                  kcal
                </small>
              </h1>

              <small className="opacity-75">
                kcal consumed today
              </small>
            </div>

            <div className="d-flex align-items-center justify-content-center rounded-circle fire-circle">
              🔥
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">
            Calorie Tracker
          </h2>

          <small className="text-muted">
            Manage your daily meals
          </small>
        </div>

        <NavLink
          to="/meals/new"
          className="nav-link-reset"
        >
          <Button
            size="lg"
            className="px-4 shadow add-meal-btn"
          >
            + Add Meal
          </Button>
        </NavLink>
      </div>

      {meals.map((meal) => (
        <Card
          key={meal.id}
          className="border-0 shadow-sm mb-3 meal-card"
        >
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Badge
                  bg="dark"
                  className="mb-3 meal-badge"
                >
                  {meal.mealTime}
                </Badge>

                <div className="text-muted small mb-2">
                  📅 {new Date(meal.date).toLocaleDateString("ru-RU")}
                </div>

                <h4 className="fw-bold mb-2">
                  {meal.description}
                </h4>

                <div className="fw-bold calories-text">
                  🔥 {meal.calories} kcal
                </div>
              </div>

              <div className="d-flex gap-2">
                <NavLink to={`/meals/${meal.id}/edit`}>
                  <Button
                    variant="outline-primary"
                    className="rounded-circle action-btn"
                  >
                    <PencilSquare size={18} />
                  </Button>
                </NavLink>

                <Button
                  variant="outline-danger"
                  className="rounded-circle action-btn"
                  onClick={() => deleteMeal(meal.id)}
                  disabled={deletingId === meal.id}
                >
                  {deletingId === meal.id ? (
                    <Spinner
                      animation="border"
                      size="sm"
                    />
                  ) : (
                    <TrashFill size={18} />
                  )}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MealItem;