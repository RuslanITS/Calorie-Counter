import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Button, Form } from "react-bootstrap";
import type { MealMutation} from "../../type";

interface Props {
  onSubmit: (meal: MealMutation) => void;
}

const MealForm = (props: Props) => {
  const [meal, setMeal] = useState<MealMutation>({
    mealTime: "Breakfast",
    description: "",
    calories: "",
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitFormHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    props.onSubmit(meal);
  };

  return (
    <Form onSubmit={submitFormHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Meal time</Form.Label>

        <Form.Select
          name="mealTime"
          value={meal.mealTime}
          onChange={selectChangeHandler}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>

        <Form.Control
          type="text"
          name="description"
          value={meal.description}
          onChange={inputChangeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Calories</Form.Label>

        <Form.Control
          type="number"
          name="calories"
          value={meal.calories}
          onChange={inputChangeHandler}
        />
      </Form.Group>

      <Button type="submit">
        Save
      </Button>
    </Form>
  );
};

export default MealForm;