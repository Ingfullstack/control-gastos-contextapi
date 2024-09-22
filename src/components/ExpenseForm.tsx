import { categorias } from "../data/categorias";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const { state, dispatch, disponible } = useBudget();
    const init = {
        amount: 0,
        expenseName: '',
        categoria: '',
        date: new Date
    }
    const [expense, setExpense] = useState<DraftExpense>(init)
    const [error, setError] = useState('');
    const [priviosAmount, setPriviosAmount] = useState(0);

    useEffect(() => {
      const existe = state.expense.find(item => item.id === state.activeId);
      if (existe) {
        setExpense(existe)
        setPriviosAmount(existe.amount);
      }
    },[state.activeId])

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const isNumber = ['amount'].includes(e.target.id);
        setExpense({
            ...expense,
            [e.target.id]: isNumber ? +e.target.value : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar

        if (Object.values(expense).includes('')) {
            setError("Todo los campos son obligatorios")
            return;
        }

        //No pasarse
        if ((expense.amount - priviosAmount ) > disponible ) {
          setError("Se pasa del presupuesto")
          return;
      }

        if (state.activeId) {
          dispatch({ type: "update-expense", payload: { expense: {
            ...expense,
            id: state.activeId
          }}})
        }else{

          dispatch({ type: "add-expense", payload: { expense: expense }})
        }

        setExpense(init)
        setError('');
        setPriviosAmount(0)
    }

  return (
    <form onSubmit={ handleSubmit } className="space-y-5">
      <legend className="text-center uppercase text-2xl font-black border-b-4 border-indigo-600 py-2">
        { state.activeId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>

      { error && <ErrorMessage>{ error }</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="expenseName">
          Nombre Gasto:
        </label>
        <input
          className="bg-slate-100 p-2"
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Nombre del gasto"
          value={ expense.expenseName }
          onChange={ handleChange }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Cantidad:
        </label>
        <input
          className="bg-slate-100 p-2"
          type="number"
          id="amount"
          name="amount"
          placeholder="Cantidad del gasto"
          value={ expense.amount }
          onChange={ handleChange }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="categoria">
          Categorias:
        </label>
        <select className="bg-slate-100 p-2" id="categoria" name="categoria" value={ expense.categoria } onChange={ handleChange }>
          <option value="">Seleccione</option>
          {categorias.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
          <label className="text-xl" htmlFor="fecha">Fecha Gasto:</label>
          <DatePicker className="w-full bg-slate-100 p-2 border-0" value={ expense.date } onChange={ handleChangeDate }/>
      </div>


      <input
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 cursor-pointer w-full p-2 text-white font-bold uppercase rounded"
        value={ state.activeId ? 'Actualizar Gastos' : 'Registrar Gastos'}
      />
    </form>
  );
}
