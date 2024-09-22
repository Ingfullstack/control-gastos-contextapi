import { formatCurrency } from "../helpers"

type Props = {
    label?: string
    amount: number
}

export default function AmountDisplay({ label, amount }: Props) {
  return (
    <p className="text-2xl text-indigo-600 font-bold">
        { label && `${ label }: `}
        <span className="text-black font-black">{ formatCurrency( amount ) }</span>
    </p>
  )
}
