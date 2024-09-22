import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { BudgetAction, BudgetState, initialState, useBudgetReducer } from "../hooks/useBudgetReducer";

type Props = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>
    gastado: number
    disponible: number
}

export const BudgetContext = createContext<Props>(null!);

export const BudgetProvider = ({ children }: { children: ReactNode } ) => {

    const [state, dispatch] = useReducer(useBudgetReducer, initialState);
    const gastado = useMemo(() => state.expense.reduce((total,item) => total + item.amount, 0) ,[state.expense])
    const disponible = state.budget - gastado;

    return(
        <BudgetContext.Provider value={{ state, dispatch, gastado, disponible }}>
            { children }
        </BudgetContext.Provider>
    )
}