import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function BudgetTracker() {
  
  const { state, gastado, disponible, dispatch } = useBudget()
  const porcentaje = (( gastado / state.budget ) * 100 ).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar value={ Number(porcentaje) } 
                                  styles={ buildStyles({
                                    pathColor: +porcentaje === 100 ? '#dc2626' : '#4f46e5',
                                    textSize: 8,
                                    textColor: +porcentaje === 100 ? '#dc2626' : '#4f46e5'
                                  })}
                                  text={`${ porcentaje }% Gastado`}
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
            <button onClick={ () => dispatch({type: "resetear-app" })} className="bg-pink-600 hover:bg-pink-700 transition-all duration-300 w-full p-2 text-white uppercase font-bold rounded-md shadow-lg">Resetear App</button>

            
            <AmountDisplay label="Presupuesto" amount={ state.budget }/>
            <AmountDisplay label="Disponible" amount={ disponible }/>
            <AmountDisplay label="Gastado" amount={ gastado }/>
        </div>
    </div>
  )
}
