import { ChangeEvent } from "react";
import { categorias } from "../data/categorias";
import { useBudget } from "../hooks/useBudget";

export default function FiltrarCategoria() {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: "filtrar-categoria-byId", payload: { id: e.target.value }})
    }

  return (
    <div className="bg-white shadow-md rounded-lg p-10">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="categoria">Filtrar Gastos</label>
                <select onChange={ handleChange } name="categoria" id="categoria" className="flex-1 bg-slate-100 rounded p-2">
                    <option value="">--Todas las Categorias--</option>
                    { categorias.map((item) => (
                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}
