import { ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode}) {
  return (
    <p className="bg-red-600 text-white font-bold text-center p-2">{ children }</p>
  )
}
