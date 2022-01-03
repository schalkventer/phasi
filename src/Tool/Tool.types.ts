export type status = 'inactive' | 'selected' | 'upcoming'

export interface StateProps {
  name: string
  children: JSX.Element | JSX.Element[]
  status: status
  note: string | null
}

export interface LinkProps {
  action: string
  destination: null | string
  status: status
  note: string | null
}
export interface Event {
  note?: string
  transition?: string
}

export interface Phase {
  nestedMachines?: string[]
  note?: string
  events?: Record<string, Event>
}

export type Machine = Record<string, Phase>

export interface MachineProps {
  machineObj: Machine
  onNested: (array: string[]) => void
}

export type Ast = Record<string, Machine>

