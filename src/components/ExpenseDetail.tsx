import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categorias } from "../data/categorias"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type Props = {
    item: Expense
}

export default function ExpenseDetail({ item }: Props ) {

    const { dispatch } = useBudget();
    const categoriaInfo = useMemo(() => categorias.find(cat => cat.id === item.categoria) ,[item]);

    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={() => dispatch({ type: "activeId", payload: { id: item.id }})}>
            Editar
          </SwipeAction>
        </LeadingActions>
      );
      
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            onClick={() => dispatch({ type: "remove-expense", payload: { id: item.id }})}
          >
            Eliminar
          </SwipeAction>
        </TrailingActions>
      );
      

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()}
                         trailingActions={trailingActions()}>
        <div className="p-5 w-full flex gap-5 items-center border-b-2 border-b-slate-200">
          <div>
            <img
              src={`/icono_${categoriaInfo?.icon}.svg`}
              alt=""
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500 ">
              {categoriaInfo?.name}
            </p>
            <p>{item.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(item.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={item.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
