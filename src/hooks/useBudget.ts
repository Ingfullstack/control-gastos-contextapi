import { useContext } from "react"
import { BudgetContext } from "../contexts/BudgetContext"

export const useBudget = () => {

    const context = useContext(BudgetContext)

    return context
}