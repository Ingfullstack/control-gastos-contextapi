import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FiltrarCategoria from "./components/FiltrarCategoria";


function App() {

  const { state } = useBudget();

  const isValid = useMemo(() => state.budget > 0 ,[state.budget]);

  useEffect(() => {
    localStorage.setItem('expense',JSON.stringify(state.expense));
    localStorage.setItem('budget',JSON.stringify(state.budget))
  },[state])

  return (
    <>
      <header className="bg-indigo-600 py-10">
          <h1 className="text-center text-2xl md:text-4xl uppercase font-bold text-white">Planificador de Gastos</h1>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-5 py-5 mt-10">
        { isValid ? <BudgetTracker/> : <BudgetForm/> }
      </div>
      { isValid && (
        <main className="max-w-4xl mx-auto py-10">
          <FiltrarCategoria/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
    </>
  )
}

export default App
