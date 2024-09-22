export type Categorias = {
    id: string
    name: string
    icon: string
}

export type Expense = {
    id: string
    expenseName: string
    amount: number
    categoria: string
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'>

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];