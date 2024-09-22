import { Categorias, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetAction = 
  { type: 'add-budget', payload: { budget: number }} |
  { type: 'modal'} |
  { type: 'close-modal'} |
  { type: 'add-expense', payload: { expense: DraftExpense }} |
  { type: 'remove-expense', payload: { id: Expense['id'] }} |
  { type: 'activeId', payload: { id: Expense['id'] }} |
  { type: 'update-expense', payload: { expense: Expense }} |
  { type: 'resetear-app'} |
  { type: 'filtrar-categoria-byId', payload: { id: Categorias['id']}} 

export type BudgetState = {
    budget: number
    modal : boolean
    expense: Expense[]
    activeId: Expense['id']
    filtrarCategoria: Categorias['id']
}

const inicialBudget = () => {
    const localBudget = localStorage.getItem('budget');
    return localBudget ? Number(localBudget) : 0
}

const inicialExpense = () => {
    const localExpense = localStorage.getItem('expense');
    return localExpense ? JSON.parse(localExpense): []
}

export const initialState: BudgetState = {
    budget: inicialBudget(),
    modal:  false,
    expense: inicialExpense(),
    activeId: '',
    filtrarCategoria: ''
}

const crearExpense = (draftExpense: DraftExpense) => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}   

export const useBudgetReducer = (state: BudgetState = initialState, action: BudgetAction) => {

    if (action.type === 'add-budget') {
        
        return{
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'modal') {
        
        return{
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        
        return{
            ...state,
            modal: false,
            activeId: ''
        }
    }

    if (action.type === 'add-expense') {
        const expense = crearExpense(action.payload.expense);

        return{
            ...state,
            expense: [...state.expense, expense],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {

        return{
            ...state,
            expense: state.expense.filter(item => item.id !== action.payload.id)
        }
    }

    if (action.type === 'activeId') {
        

        return{
            ...state,
            activeId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        
        return{
            ...state,
            expense: state.expense.map(item => item.id === action.payload.expense.id ? { ...action.payload.expense }: item),
            modal: false,
            activeId: ''
        }
    }

    if(action.type === 'resetear-app'){

        return{
            ...state,
            budget: 0,
            expense: []
        }
    }

    if (action.type === 'filtrar-categoria-byId') {
        
        return{
            ...state,
            filtrarCategoria: action.payload.id
        }
    }

    return state
}