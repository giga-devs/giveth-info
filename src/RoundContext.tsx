import { createContext, useState, ReactNode, useContext, Dispatch } from 'react'

export interface RoundType {
  fromDate: string
  toDate: string
}

interface RoundProviderProps {
  children: ReactNode
}

interface ContextType {
  round: RoundType
  setRound: Dispatch<RoundType>
}

export const RoundContext = createContext<ContextType>({} as ContextType)

export function RoundProvider({ children }: RoundProviderProps) {
  const [round, setRound] = useState({
    fromDate: '',
    toDate: '',
  })

  return (
    <RoundContext.Provider value={{ round, setRound }}>
      {children}
    </RoundContext.Provider>
  )
}

export default function useRoundContext() {
  const context = useContext(RoundContext)

  return context
}
