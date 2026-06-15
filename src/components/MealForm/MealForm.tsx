import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Button, Form } from "react-bootstrap";
import type { MealMutation } from "../../type";
import "./MealForm.css";
import { Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

interface Props {
  onSubmit: (meal: MealMutation) => void | Promise<void>;
  existingMeal?: MealMutation;
}

const MealForm = ({onSubmit, existingMeal,}: Props) => {
  const [meal, setMeal] = useState<MealMutation>(
    existingMeal ?? {
      mealTime: "Breakfast",
      description: "",
      calories: "",
      date: new Date().toISOString().split('T')[0],
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectChangeHandler = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitFormHandler = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    if (
      meal.description.trim() === ""
      || meal.calories.trim() === ""
      || Number(meal.calories) <= 0
    ) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit(meal);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto form-wrapper">
      <Card className="border-0 shadow-lg form-card">
        <Card.Body className="p-4">

          <h3 className="mb-4 form-title">
            {existingMeal ? "Edit Meal" : "Add New Meal"}
          </h3>

          <Form onSubmit={submitFormHandler}>
            <Form.Group className="mb-4">
              <Form.Label>
                Meal Time
              </Form.Label>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>

                <Form.Control
                  type="date"
                  name="date"
                  value={meal.date}
                  onChange={inputChangeHandler}
                />
              </Form.Group>

              <Form.Select
                className="form-input"
                name="mealTime"
                value={meal.mealTime}
                onChange={selectChangeHandler}
              >
                <option value="Breakfast">
                  Breakfast
                </option>

                <option value="Snack">
                  Snack
                </option>

                <option value="Lunch">
                  Lunch
                </option>

                <option value="Dinner">
                  Dinner
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                className="form-input"
                type="text"
                name="description"
                value={meal.description}
                onChange={inputChangeHandler}
                placeholder="For example: Chicken salad"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Calories
              </Form.Label>

              <Form.Control
                className="form-input"
                type="number"
                name="calories"
                value={meal.calories}
                onChange={inputChangeHandler}
                placeholder="500"
                min="1"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                size="lg"
                className="save-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : existingMeal ? (
                  "Update Meal"
                ) : (
                  "Save Meal"
                )}
              </Button>
            </div>
          </Form>

        </Card.Body>
      </Card>
    </div>
  );
};

export default MealForm;