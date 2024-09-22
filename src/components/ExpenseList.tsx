import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {

    const { state } = useBudget();

    const filtrar = state.filtrarCategoria ? state.expense.filter(item => item.categoria === state.filtrarCategoria): state.expense
    const isEmpty = useMemo(() => filtrar.length === 0 ,[filtrar]);

  return (
    <div className="mt-5 bg-white shadow-lg rounded-md p-3">
       { isEmpty ? <p className="text-gray-800 text-2xl font-bold mx-3">No hay Gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5 mx-3">Listado de Gastos</p>

                { filtrar.map(item => (
                    <ExpenseDetail key={ item.id } item={ item }/>
                ))}
            </>
       )} 
    </div>
  )
}
