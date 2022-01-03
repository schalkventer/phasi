export const createFile = () => {
    ``
}



export interface One {
  fn: () => void
  value: 'resting'
}

export interface Two {
  fn: () => void
  value: 'resting'
}

export interface PhaseMap {
  one: Omit<One, 'value'>
  two: Omit<Two, 'value'>
}

export interface AsMap {
    one: () => Omit<One, 'value'>
    two: () => Omit<Two, 'value'>
}

export interface Callbacks {
  one: (phase: One) => Promise<void>
  two: (two: Two) => Promise<void>
}

export type ActivePhase = One | Two

export type Phase = ActivePhase & { as: AsMap; prev: null | keyof PhaseMap }
export type setPhase = (newPhase: keyof PhaseMap) => void
export type createMap = (setPhase: setPhase) => PhaseMap
