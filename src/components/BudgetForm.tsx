import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

  const { dispatch } = useBudget();

  const [budget, setBudget] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "add-budget", payload: { budget: budget }});
    setBudget(0);
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  return (
    <form onSubmit={ handleSubmit } className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-2xl uppercase md:text-3xl text-center font-bold text-indigo-600"
        >
          Define Presupuesto
        </label>
        <input
          type="number"
          className="w-full border border-gray-200 p-2 rounded-lg"
          placeholder="Define tu Presupuesto"
          name="budget"
          id="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white w-full p-2 rounded cursor-pointer font-bold uppercase disabled:opacity-15"
        value="Definir Presupuesto"
        disabled={isValid}
      />
    </form>
  );
}
